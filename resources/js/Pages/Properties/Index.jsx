import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

const Index = ({ properties }) => {
    const [expanded, setExpanded] = useState({});

    const toggleDescription = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div >
            <h1 className="text-2xl font-bold mb-4">Properties</h1>
            <div className="flex gap-4">
                    <Link 
                        href="/dashboard" 
                        className="mt-4 inline-block bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
                        Go to Dashboard
                    </Link>
                    <Link 
                        href="/properties/create" 
                        className="mt-4 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                        Add Property
                    </Link>
            </div>
            <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(property => (
                        <tr key={property.id}>
                            <td className="px-6 py-4 text-sm text-gray-900">{property.name}</td>

                            {/* Description Column with Toggle */}
                            <td className="px-6 py-4 text-sm text-gray-900 break-words max-w-xs">
                                {expanded[property.id] ? (
                                    <>
                                        {property.description}
                                        <button 
                                            onClick={() => toggleDescription(property.id)}
                                            className="text-blue-600 hover:underline ml-2">
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
                                                className="text-blue-600 hover:underline ml-2">
                                                See More
                                            </button>
                                        )}
                                    </>
                                )}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-900">{property.price}</td>

                            {/* Action Buttons */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link href={`/properties/${property.id}/edit`} 
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2">
                                    Edit
                                </Link>
                                <button 
                                    onClick={() => handleDelete(property.id)} 
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this property?')) {
        Inertia.delete(`/properties/${id}`);
    }
};

export default Index;
