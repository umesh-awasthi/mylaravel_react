import { Head, Link } from "@inertiajs/react";
import React from "react";
import AppLayout from "@/Layouts/AppLayout";
export default function Welcome({ auth, properties, selectedCategory }) {
    // console.log(properties);
    return (
        <AppLayout>
        <>
           
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen">
                <div className="relative w-full max-w-7xl mx-auto px-6 py-10">
                    
                    {/* Header Section */}
                    {/* <header className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                            Real Estate Listings
                        </h1>
                        <nav className="flex space-x-4">
                            {auth.user ? (
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
                    </header> */}

                    {/* Property Category Filters */}
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-black dark:text-white">Find Your Perfect Property</h2>
                        <div className="mt-4 flex space-x-4">
                            <Link
                                href={route("properties.index")}
                                className={`px-6 py-3 rounded-lg ${!selectedCategory ? "bg-blue-600" : "bg-blue-500"} text-white hover:bg-blue-700`}
                            >
                                All
                            </Link>
                            <Link
                                href={route("properties.index", { category: "Buy" })}
                                className={`px-6 py-3 rounded-lg ${selectedCategory === "Buy" ? "bg-blue-600" : "bg-blue-500"} text-white hover:bg-blue-700`}
                            >
                                Buy
                            </Link>
                            <Link
                                href={route("properties.index", { category: "Rent" })}
                                className={`px-6 py-3 rounded-lg ${selectedCategory === "Rent" ? "bg-green-600" : "bg-green-500"} text-white hover:bg-green-700`}
                            >
                                Rent
                            </Link>
                            <Link
                                href={route("properties.index", { category: "Sold" })}
                                className={`px-6 py-3 rounded-lg ${selectedCategory === "Sold" ? "bg-gray-600" : "bg-gray-500"} text-white hover:bg-gray-700`}
                            >
                                Sold
                            </Link>
                        </div>
                    </section>

                    {/* Property Listings */}
                    <section>
                        
                   

                        <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
                            {selectedCategory ? `Properties for ${selectedCategory}` : "All Properties"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.length > 0 ? (
                                properties.map((property) => (
                                    <div key={property.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                                      <img src={`/storage/${property.image}`} alt="Property Image" />

                                        <h3 className="mt-2 text-lg font-semibold text-black dark:text-white">{property.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{property.description}</p>
                                        <p className="text-black dark:text-white font-bold mt-1">₹{property.price}</p>
                                        <Link
                                            href={route("properties.show", property.id)}
                                            className="mt-3 inline-block px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600 dark:text-gray-300">No properties found.</p>
                            )}
                        </div>
                         {/* Pagination Links */}
                         {/* <div className="mt-6 flex justify-center space-x-2">
                                {properties.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || "#"}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-lg ${
                                            link.active ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
                                        } hover:bg-blue-600`}
                                    />
                                ))}
                                </div> */}
                    </section>
                </div>
            </div>
        </>
        </AppLayout>
    );
}
