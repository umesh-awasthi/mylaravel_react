<?php

namespace App\Repositories;

interface PropertyRepositoryInterface
{
    public function createProperty(array $data);
    public function getPropertyById($id);
    public function updateProperty($id, array $data);
    public function deleteProperty($id);
    public function getAllProperties();
    public function getPropertiesByCategory($category); // New method for filtering Buy, Rent, Sold
}
