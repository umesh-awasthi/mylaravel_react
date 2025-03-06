import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react'; // Import Link

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/properties');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Add Property</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && <div>{errors.name}</div>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                    />
                    {errors.description && <div>{errors.description}</div>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                        type="number"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                        required
                    />
                    {errors.price && <div>{errors.price}</div>}
                </div>
                <button type="submit" disabled={processing} className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                    Add Property
                </button>
            </form>
        </div>
    );
};

export default Create;
