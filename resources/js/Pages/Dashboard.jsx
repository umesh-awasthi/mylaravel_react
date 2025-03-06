import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    // Debugging - Console Log
    // console.log("Dashboard Component Rendered");
    
    // if (!auth) {
    //     console.log("Auth is undefined or null");
    // } else {
    //     console.log("Auth Object:", auth);
    //     console.log("User Role:", auth?.user?.role);
    //     console.log("User Permissions:", auth?.user?.permissions);}

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mt-4">Dashboard</h3>
                            
                            {/* Display role for debugging
                            <p>Role: {auth?.user?.role}</p>
                            <p>Permissions: {JSON.stringify(auth?.user?.permissions)}</p> */}

                            <div className="space-y-4">
                                {auth?.user?.role === 'admin' && (
                                    <>
                                        <div>
                                            <h4 className="font-medium mb-2">User Management</h4>
                                            <Link href="/admin/users/create" className="btn btn-primary mr-2">
                                                Create User
                                            </Link>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">Role Management</h4>
                                            <Link href="/admin/roles/create" className="btn btn-primary mr-2">
                                                Create Role
                                            </Link>
                                            <Link href="/admin/roles" className="btn btn-secondary mr-2">
                                                View Roles
                                            </Link>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">Permission Management</h4>
                                            <Link href="/admin/permissions/create" className="btn btn-primary mr-2">
                                                Create Permission
                                            </Link>
                                            <Link href="/admin/permissions" className="btn btn-secondary mr-2">
                                                View Permissions
                                            </Link>
                                        </div>
                                        {/* <div>
                                            <h4 className="font-medium mb-2">Assign Permissions</h4>
                                            <Link href="/admin/roles/assign-permissions" className="btn btn-primary mr-2">
                                                Assign to Roles
                                            </Link>
                                            <Link href="/admin/users/assign-permissions" className="btn btn-secondary">
                                                Assign to Users
                                            </Link>
                                        </div> */}
                                    </>
                                )}

                                {(auth?.user?.role === 'admin' || auth?.user?.permissions?.includes('view_properties')) && (
                                    <div>
                                        <h4 className="font-medium mb-2">Property Management</h4>
                                        <Link href="/properties" className="btn btn-primary mr-2">
                                            View Properties
                                        </Link>
                                        {(auth?.user?.role === 'admin' || auth?.user?.permissions?.includes('create_properties')) && (
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
