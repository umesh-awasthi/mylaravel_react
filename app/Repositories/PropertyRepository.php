<?php

namespace App\Repositories;

use App\Models\Property;

class PropertyRepository
{
    /**
     * Get all properties.
     */
    public function all()
    {
        return Property::all(); // Fetch all properties
    }

    /**
     * Get properties that the admin can manage.
     */
    public function getManageableProperties($admin)
    {
        return Property::all()->filter(function ($property) use ($admin) {
            return $admin->canManageProperty($property);
        });
    }

    /**
     * Create a new property.
     */
    public function create(array $data)
    {
        return Property::create($data);
    }

    /**
     * Find a property by ID.
     */
    public function find($id)
    {
        return Property::findOrFail($id);
    }

    /**
     * Update a property.
     */
    public function update($id, array $data)
    {
        $property = $this->find($id);
        $property->update($data);
        return $property;
    }

    /**
     * Delete a property.
     */
    public function delete($id)
    {
        $property = $this->find($id);
        $property->delete();
        return $property;
    }
}
