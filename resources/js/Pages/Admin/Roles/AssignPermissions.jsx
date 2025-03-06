import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AssignPermissions({ role, permissions }) {
    // Group permissions by parent
    const groupedPermissions = permissions.reduce((acc, permission) => {
        if (!permission.parent_id) {
            acc[permission.id] = { ...permission, children: [] };
        } else {
            acc[permission.parent_id]?.children.push(permission);
        }
        return acc;
    }, {});

    // Initial state with preselected permissions
    const { data, setData, post, processing } = useForm({
        permissions: role.permissions.map(p => p.id),
    });

    // Handle Parent Checkbox Change
    const handleParentChange = (parentId, isChecked) => {
        let updatedPermissions = [...data.permissions];

        if (isChecked) {
            updatedPermissions = [
                ...new Set([...updatedPermissions, parentId, ...groupedPermissions[parentId].children.map(c => c.id)])
            ];
        } else {
            updatedPermissions = updatedPermissions.filter(id => id !== parentId && !groupedPermissions[parentId].children.some(c => c.id === id));
        }

        setData('permissions', updatedPermissions);
        updatePermissions(updatedPermissions);
    };

    // Handle Child Checkbox Change
    const handleChildChange = (childId, parentId, isChecked) => {
        let updatedPermissions = [...data.permissions];

        if (isChecked) {
            updatedPermissions.push(childId);
            if (groupedPermissions[parentId].children.every(c => updatedPermissions.includes(c.id))) {
                updatedPermissions.push(parentId); // Check parent if all children are checked
            }
        } else {
            updatedPermissions = updatedPermissions.filter(id => id !== childId);
            if (updatedPermissions.includes(parentId)) {
                updatedPermissions = updatedPermissions.filter(id => id !== parentId); // Uncheck parent if any child is unchecked
            }
        }

        setData('permissions', updatedPermissions);
        updatePermissions(updatedPermissions);
    };

    // Determine Parent Checkbox State
    const getParentState = (parentId) => {
        const childIds = groupedPermissions[parentId].children.map(c => c.id);
        const checkedChildren = childIds.filter(id => data.permissions.includes(id));

        if (checkedChildren.length === 0) return false; // No children selected
        if (checkedChildren.length === childIds.length) return true; // All children selected
        return 'indeterminate'; // Some children selected
    };

    // Update Permissions in Database via AJAX
    const updatePermissions = (permissions) => {
        post(route('admin.roles.assign-permissions.update', role.id), {
            permissions,
        }, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Assign Permissions - ${role.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-semibold mb-6">
                            Assign Permissions to Role: {role.name}
                        </h1>

                        <div className="space-y-6">
                            {Object.values(groupedPermissions).map(parent => (
                                <div key={parent.id} className="border-b pb-4">
                                    {/* Parent Checkbox */}
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`parent_${parent.id}`}
                                            checked={getParentState(parent.id) === true}
                                            ref={(el) => { if (el) el.indeterminate = getParentState(parent.id) === 'indeterminate'; }}
                                            onChange={(e) => handleParentChange(parent.id, e.target.checked)}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`parent_${parent.id}`} className="ml-3 font-semibold text-gray-800">
                                            {parent.name}
                                        </label>
                                    </div>

                                    {/* Child Checkboxes */}
                                    {parent.children.length > 0 && (
                                        <div className="pl-6 mt-2 space-y-2">
                                            {parent.children.map(child => (
                                                <div key={child.id} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`child_${child.id}`}
                                                        checked={data.permissions.includes(child.id)}
                                                        onChange={(e) => handleChildChange(child.id, parent.id, e.target.checked)}
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                    />
                                                    <label htmlFor={`child_${child.id}`} className="ml-3 text-sm text-gray-600">
                                                        {child.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex items-center justify-end mt-6">
                            <Link href={route('admin.roles.index')} className="text-gray-600 hover:text-gray-900 mr-4">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
