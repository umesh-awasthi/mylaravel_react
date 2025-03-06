import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) { // Get auth object from props
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
                            
                            {/* Show Manage Properties only for Admin */}
                           
                            {auth.user.role === 'admin' && (
                                <>
                                    <h3 className="text-lg font-semibold mt-4">Manage Properties</h3>
                                    <Link href="/properties" className="btn btn-primary mr-2">
                                        View Properties
                                    </Link>
                                    <Link href="/properties/create" className="btn btn-secondary">
                                        Add Property
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
