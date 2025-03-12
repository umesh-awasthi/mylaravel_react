<?php

namespace App\Repositories;

use App\Models\Property;

class PropertyRepository
{
    public function getAllPropertiess()
{
    return Property::query(); // Return query builder instead of collection
}
    public function getAllProperties()
    {
        return Property::select('id', 'name', 'description', 'price', 'image', 'category_id')->get();
    }

    /**
     * Get properties filtered by category (Buy, Rent, Sold).
     */
    public function getPropertiesByCategory($category)
    {
        return Property::where('category_id', strtolower($category))
            ->select('id', 'name', 'description', 'price', 'image', 'category_id')
            ->get();
    }

    /**
     * Create a new property.
     */
    public function createProperty(array $data)
    {
        // Handle the image upload if it exists
        if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
            $data['image'] = $data['image']->store('images', 'public'); // Store image in the public disk
        }

        return Property::create($data);
    }

    /**
     * Find a property by ID.
     */
    public function getPropertyById($id)
    {
        return Property::findOrFail($id);
    }
   
    /**
     * Update a property.
     */
    public function updateProperty($id, array $data)
    {
        $property = $this->getPropertyById($id);
        $property->update($data);
        return $property;
        
    }

    public function deleteProperty($id){
        $property = $this->getPropertyById($id);
    
    }
}
