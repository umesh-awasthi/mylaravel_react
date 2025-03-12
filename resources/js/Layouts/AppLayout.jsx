import React from "react";
import { Link, Head } from "@inertiajs/react";

const AppLayout = ({ auth, title, children }) => {
    return (
        <>
            <Head title={title} />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
                <div className="relative w-full max-w-7xl mx-auto px-6 py-10">
                    
                    {/* Header Section */}
                    <header className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                            Real Estate Listings
                        </h1>
                        <nav className="flex space-x-4">
                            {auth?.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="text-black dark:text-white hover:text-gray-600"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route("login")} className="text-black dark:text-white hover:text-gray-600">
                                        Log in
                                    </Link>
                                    <Link href={route("register")} className="text-black dark:text-white hover:text-gray-600">
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    

                    {/* Page Content */}
                    <main>{children}</main>
                </div>
            </div>
        </>
    );
};

export default AppLayout;
