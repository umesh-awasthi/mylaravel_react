import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    // Extract user role & permissions
    const userRole = auth?.user?.role;
    // console.log(userRole);
    const userPermissions = auth?.user?.permissions || [];
    // console.log(userPermissions);
    // Function to check if the user has a specific permission
    const hasPermission = (permission) => userPermissions.includes(permission);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* <h3 className="text-lg font-semibold mt-4">Admin Dashboard</h3> */}

                            {/* Debugging Info */}
                            {/* <p className="text-sm text-gray-500">Role: {userRole}</p>
                            <p className="text-sm text-gray-500">Permissions: {JSON.stringify(userPermissions)}</p> */}

                            <div className="space-y-4">
                                {/* Admin Features */}
                                {userRole === 'admin' && (
                                    <>
                                        {hasPermission('user_manage') && (
                                            <div>
                                                <h4 className="font-medium mb-2">User Management</h4>
                                                {hasPermission('user_create') && (
                                                    <Link href="/admin/users/create" className="btn btn-primary mr-2">
                                                        Create User
                                                    </Link>
                                                )}
                                            </div>
                                        )}

                                        {hasPermission('role_manage') && (
                                            <div>
                                                <h4 className="font-medium mb-2">Role Management</h4>
                                                {hasPermission('role_create') && (
                                                    <Link href="/admin/roles/create" className="btn btn-primary mr-2">
                                                        Create Role
                                                    </Link>
                                                )}
                                                <Link href="/admin/roles" className="btn btn-secondary mr-2">
                                                    View Roles
                                                </Link>
                                            </div>
                                        )}

                                        {hasPermission('permission_manage') && (
                                            <div>
                                                <h4 className="font-medium mb-2">Permission Management</h4>
                                                {hasPermission('permission_create') && (
                                                    <Link href="/admin/permissions/create" className="btn btn-primary mr-2">
                                                        Create Permission
                                                    </Link>
                                                )}
                                                <Link href="/admin/permissions" className="btn btn-secondary mr-2">
                                                    View Permissions
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Property Management (For Admins, Agents, and Assigned Users) */}
                                {(userRole === 'admin' || hasPermission('propertie_view')) && (
                                    <div>
                                        <h4 className="font-medium mb-2">Property Management</h4>
                                        <Link href="/properties" className="btn btn-primary mr-2">
                                            View Properties
                                        </Link>
                                        {hasPermission('propertie_create') && (
                                            <Link href="/properties/create" className="btn btn-secondary">
                                                Add Property
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
