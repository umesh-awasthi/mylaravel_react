import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function AssignPermissions({ role, permissions }) {
    // Group permissions by a single common parent prefix
    const groupedPermissions = permissions.reduce((acc, permission) => {
        const [parentPrefix] = permission.name.split("_"); // Extract parent prefix

        if (!acc[parentPrefix]) {
            acc[parentPrefix] = {
                name: parentPrefix,
                children: [],
            };
        }

        acc[parentPrefix].children.push(permission);
        return acc;
    }, {});

    // Initialize form with preselected permissions
    const { data, setData, post, processing } = useForm({
        permissions: role.permissions.map((p) => p.id),
    });

    // Handle Parent Checkbox Change (select/unselect all children)
    const handleParentChange = (parentPrefix, isChecked) => {
        let updatedPermissions = [...data.permissions];
        const childrenIds = groupedPermissions[parentPrefix].children.map((c) => c.id);

        if (isChecked) {
            updatedPermissions = [...new Set([...updatedPermissions, ...childrenIds])];
        } else {
            updatedPermissions = updatedPermissions.filter((id) => !childrenIds.includes(id));
        }

        setData("permissions", updatedPermissions);
    };

    // Handle Child Checkbox Change (individual selection)
    const handleChildChange = (childId, parentPrefix, isChecked) => {
        let updatedPermissions = [...data.permissions];

        if (isChecked) {
            updatedPermissions.push(childId);
        } else {
            updatedPermissions = updatedPermissions.filter((id) => id !== childId);
        }

        setData("permissions", updatedPermissions);
    };

    // Determine Parent Checkbox State
    const getParentState = (parentPrefix) => {
        const childIds = groupedPermissions[parentPrefix].children.map((c) => c.id);
        const checkedChildren = childIds.filter((id) => data.permissions.includes(id));

        if (checkedChildren.length === 0) return false; // No children selected
        if (checkedChildren.length === childIds.length) return true; // All children selected
        return "indeterminate"; // Some children selected
    };

    // Save Assigned Permissions
    const handleAssignPermissions = () => {
        post(route("admin.roles.assign-permissions.store", role.id), { permissions: data.permissions });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Assign Permissions - ${role.name}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-semibold mb-6">
                            Assign Permissions to Role: {role.name}
                        </h1>

                        {/* Grouped Permissions List */}
                        <div className="space-y-6">
                            {Object.entries(groupedPermissions).map(([parentPrefix, group]) => (
                                <div key={parentPrefix} className="border-b pb-4">
                                    {/* Parent Checkbox */}
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`parent_${parentPrefix}`}
                                            checked={getParentState(parentPrefix) === true}
                                            ref={(el) => {
                                                if (el)
                                                    el.indeterminate = getParentState(parentPrefix) === "indeterminate";
                                            }}
                                            onChange={(e) => handleParentChange(parentPrefix, e.target.checked)}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`parent_${parentPrefix}`} className="ml-3 font-semibold text-gray-800">
                                            {parentPrefix}
                                        </label>
                                    </div>

                                    {/* Child Checkboxes */}
                                    <div className="pl-6 mt-2 space-y-2">
                                        {group.children.map((child) => (
                                            <div key={child.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`child_${child.id}`}
                                                    checked={data.permissions.includes(child.id)}
                                                    onChange={(e) => handleChildChange(child.id, parentPrefix, e.target.checked)}
                                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                />
                                                <label htmlFor={`child_${child.id}`} className="ml-3 text-sm text-gray-600">
                                                    {child.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end mt-6">
                            <button
                                onClick={handleAssignPermissions}
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200"
                                disabled={processing}
                            >
                                {processing ? "Saving..." : "Assign Permissions"}
                            </button>
                            <Link href={route("admin.roles.index")} className="text-gray-600 hover:text-gray-900 ml-4">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
