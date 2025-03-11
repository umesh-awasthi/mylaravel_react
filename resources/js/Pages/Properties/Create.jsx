import React from "react";
import { useForm } from "@inertiajs/inertia-react";

const Create = ({ categories }) => { // Accept categories as a prop
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        price: "",
        category_id: "", // Store selected category ID
        image: null, // Store image file
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("image", data.image);
        formData.append("category_id", data.category_id);

        post("/properties", formData);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Add Property</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    {errors.description && <div className="text-red-500">{errors.description}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        required
                    />
                    {errors.price && <div className="text-red-500">{errors.price}</div>}
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        value={data.category_id}
                        onChange={(e) => setData("category_id", e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <div className="text-red-500">{errors.category_id}</div>}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("image", e.target.files[0])}
                    />
                    {errors.image && <div className="text-red-500">{errors.image}</div>}
                </div>

                <button type="submit" disabled={processing} className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Add Property
                </button>
            </form>
        </div>
    );
};

export default Create;
