<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropertyRequest;
use App\Repositories\AdminRepository;
use App\Repositories\PropertyRepository;
use App\Repositories\RoleRepository;
use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class PropertyController extends Controller
{
    protected $propertyRepository;
    protected $roleRepository;
    protected $adminRepository;

    public function __construct(
        PropertyRepository $propertyRepository, 
        AdminRepository $adminRepository,
        RoleRepository $roleRepository
    ) {
        $this->roleRepository = $roleRepository;
        $this->propertyRepository = $propertyRepository;
        $this->adminRepository = $adminRepository;
    }

    

    public function index(Request $request)
{
    // Fetch all categories from the database
    $categories = Category::select('id', 'name')->get();

    // Get category from request (e.g., "buy", "rent", "sold")
    $category = $request->query('category'); 

    // Find category ID dynamically from the database
    $categoryId = $categories->where('name', $category)->pluck('id')->first();

    // Fetch properties based on category_id, or fetch all if not provided
    $properties = $categoryId 
        ? $this->propertyRepository->getPropertiesByCategory($categoryId)
        : $this->propertyRepository->getAllProperties();

    // Format properties for Inertia
    $properties = $properties->map(function ($property) {
        return [
            'id' => $property->id,
            'name' => $property->name,
            'description' => $property->description,
            'price' => $property->price,
            'image' => $property->image,
            'category_id' => $property->category_id,
            'category_name' => $property->category->name ?? null, // Ensure category name is included
        ];
    });

    // Fetch role permissions if authenticated
    $rolePermissions = [];
    if (auth()->check()) {
        $user = auth()->user();
        $role = $this->roleRepository->findRoleById($user->role_id);
        $rolePermissions = $this->roleRepository->getRolePermissions($role);
    }

    \Log::info('Properties fetched:', $properties->toArray()); // Logs to storage/logs/laravel.log

    return Inertia::render('Properties/Index', [
        'properties' => $properties ?? [],
        'rolePermissions' => $rolePermissions,
        'selectedCategory' => $category, // Send selected category to frontend
        'categories' => $categories, // Send all categories to frontend
    ]);
}

    

    /**
     * Show the form for creating a new property.
     */
    public function create()
    {
        $categories = Category::select('id', 'name')->get(); // Fetch categories
        return Inertia::render('Properties/Create', [
            'categories' => $categories, // Pass categories to the component
        ]); // Add the missing closing bracket here
    }

    /**
     * Store a newly created property.
     */
    public function store(PropertyRequest $request)
    {
        $data = $request->validated();
        
        // Handle image upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public'); // Store image in the public disk
        }

        $this->propertyRepository->createProperty($data);
        return redirect()->route('properties.index')->with('success', 'Property created successfully.');
    }

    /**
     * Show the form for editing a property.
     */
    public function edit($id)
    {
        $property = $this->propertyRepository->getPropertyById($id);
        $categories = Category::all(); // Fetch all categories
    
        return Inertia::render('Properties/Edit', compact('property', 'categories'));
    }
    
    /**
     * Update an existing property.
     */
    // public function update(PropertyRequest $request, $id)
    // {
    //     $this->propertyRepository->updateProperty($id, $request->validated());
    //     return redirect()->route('properties.index')->with('success', 'Property updated successfully.');
    // }

    public function update(PropertyRequest $request, $id)
{
    $property = $this->propertyRepository->getPropertyById($id);
    $data = $request->validated();

    // Handle image update
    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('images', 'public');
    } else {
        $data['image'] = $property->image; // Keep existing image if not updated
    }

    $this->propertyRepository->updateProperty($id, $data);

    return redirect()->route('properties.index')->with('success', 'Property updated successfully.');
}


    /**
     * Delete a property.
     */
    public function destroy($id)
    {
        $this->propertyRepository->deleteProperty($id);
        return redirect()->route('properties.index')->with('success', 'Property deleted successfully.');
    }
}
