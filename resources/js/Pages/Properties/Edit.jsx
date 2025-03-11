import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';

const Edit = ({ property, categories }) => {
    const { data, setData, put, processing, errors } = useForm({
        name: property.name,
        description: property.description,
        price: property.price,
        image: null,
        category_id: property.category_id || '', // Single category selection
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category_id', data.category_id);
    
        // Check if a new image is uploaded
        if (data.image) {
            formData.append('image', data.image);
        }
    
        // Laravel requires `_method` for PUT requests with FormData
        formData.append('_method', 'PUT');
    
        Inertia.post(`/properties/${property.id}`, formData, {
            forceFormData: true,
        });
    };
    

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Property</h1>
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
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <div className="space-y-2">
                        {categories.map(category => (
                            <div key={category.id} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`category-${category.id}`}
                                    value={category.id}
                                    checked={data.category_id === category.id}
                                    onChange={() => setData('category_id', category.id)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                                    {category.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        onChange={e => setData('image', e.target.files[0])}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button type="submit" disabled={processing} className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                    Update Property
                </button>
            </form>
        </div>
    );
};

export default Edit;
