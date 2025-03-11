import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

const Index = ({ properties, rolePermissions, selectedCategory }) => {
    //console.log(rolePermissions);
    const [expanded, setExpanded] = useState({});
    const [activeCategory, setActiveCategory] = useState(selectedCategory || "");

    const toggleDescription = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const filterByCategory = (category) => {
        setActiveCategory(category);
        Inertia.get("/", { category }); // Updates URL and fetches filtered data
    };

    return (
        <div className="container mx-auto p-4">
            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-6">
                {["Buy", "Rent", "Sold"].map((category) => (
                    <button
                        key={category}
                        onClick={() => filterByCategory(category)}
                        className={`px-4 py-2 rounded font-bold ${
                            activeCategory === category
                                ? "bg-blue-700 text-white"
                                : "bg-gray-300 text-black hover:bg-gray-400"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <h1 className="text-2xl font-bold mb-4 text-center">Properties</h1>

            {/* Property Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <div key={property.id} className="border rounded-lg shadow-md p-4">
                        <img src={property.image_url} alt={property.title} className="w-full h-40 object-cover rounded" />
                        <h2 className="text-lg font-bold mt-2">{property.title}</h2>
                        <p className="text-gray-600">{property.location}</p>
                        <p className="text-xl font-semibold mt-1">₹{property.price}</p>

                        {/* Expandable Description */}
                        <p className="text-sm text-gray-800 mt-2">
                            {expanded[property.id] ? (
                                <>  {property.name}
                                    {property.description}
                                    <button
                                        onClick={() => toggleDescription(property.id)}
                                        className="text-blue-600 hover:underline ml-2"
                                    >
                                        See Less
                                    </button>
                                </>
                            ) : (
                                <>
                                    {property.description.length > 50
                                        ? `${property.description.substring(0, 50)}...`
                                        : property.description}
                                    {property.description.length > 50 && (
                                        <button
                                            onClick={() => toggleDescription(property.id)}
                                            className="text-blue-600 hover:underline ml-2"
                                        >
                                            See More
                                        </button>
                                    )}
                                </>
                            )}
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-4 flex gap-2">
                            {rolePermissions.includes("propertie_edit") && (
                                <Link
                                    href={`/properties/${property.id}/edit`}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </Link>
                            )}
                            {rolePermissions.includes("propertie_delete") && (
                                <button
                                    onClick={() => handleDelete(property.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this property?")) {
        Inertia.delete(`/properties/${id}`);
    }
};

export default Index;
