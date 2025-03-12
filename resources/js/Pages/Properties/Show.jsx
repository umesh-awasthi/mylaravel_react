import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";

const Show = ({ property }) => {
    return (
        <AppLayout>
            <Head title={property.name} />

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
                    <img
                        src={`/storage/${property.image}`}
                        alt={property.name}
                        className="w-full h-80 object-cover"
                    />

                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900">{property.name}</h2>
                        <p className="text-gray-600 mt-2">{property.description}</p>
                        <p className="text-lg font-semibold text-black mt-4">
                            Price: ₹{property.price}
                        </p>
                        <button
                            onClick={() => window.history.back()}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-4"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
