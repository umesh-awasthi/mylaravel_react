<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropertyRequest; // Assuming you will create a request for validation
use App\Repositories\AdminRepository; // Add this import at the top
use App\Repositories\PropertyRepository;
use App\Repositories\RoleRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    protected $propertyRepository;
    protected $roleRepository;

    protected $adminRepository; // Add this line

    public function __construct(PropertyRepository $propertyRepository, AdminRepository $adminRepository
    ,RoleRepository $roleRepository) // Modify the constructor
    {
        $this->roleRepository = $roleRepository;
        $this->propertyRepository = $propertyRepository;
        $this->adminRepository = $adminRepository; // Initialize the adminRepository
    }

    /**
     * Display a listing of properties.
     */
    public function index()
    {
        $properties = $this->propertyRepository->all(); // Fetch all properties
        // Add permission check to filter properties based on admin's permissions
        $properties = $properties->filter(function ($property) {
            return $this->adminRepository->canManageProperty($property);
        });

        // Get the current user's role and permissions
        $user = auth()->user();
      
        $role = $this->roleRepository->findRoleById($user->role_id);
        $rolePermissions = $this->roleRepository->getRolePermissions($role);
        \Log::info('User:', ['user' => $user, 'roles' => $user->role_id, 'permissions' => $rolePermissions]);
        // dd($rolePermissions);
        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'rolePermissions' => $rolePermissions // Pass permissions to the view
        ]);
    }

    /**
     * Show the form for creating a new property.
     */
    public function create()
    {
        return Inertia::render('Properties/Create');
    }

    /**
     * Store a newly created property in storage.
     */
    public function store(PropertyRequest $request)
    {
        $this->propertyRepository->create($request->validated());
        return redirect()->route('properties.index')->with('success', 'Property created successfully.');
    }

    /**
     * Show the form for editing the specified property.
     */
    public function edit($id)
    {
        $property = $this->propertyRepository->find($id);
        return Inertia::render('Properties/Edit', compact('property'));
    }

    /**
     * Update the specified property in storage.
     */
    public function update(PropertyRequest $request, $id)
    {
        $this->propertyRepository->update($id, $request->validated());
        return redirect()->route('properties.index')->with('success', 'Property updated successfully.');
    }

    /**
     * Remove the specified property from storage.
     */
    public function destroy($id)
    {
        $this->propertyRepository->delete($id);
        return redirect()->route('properties.index')->with('success', 'Property deleted successfully.');
    }
}
