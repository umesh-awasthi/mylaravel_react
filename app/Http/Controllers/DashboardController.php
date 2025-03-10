<?php

namespace App\Http\Controllers;

use App\Repositories\RoleRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $role = $this->roleRepository->findRoleById($user->role_id); // Use RoleRepository to get the role
     

        // Check user role and render the appropriate dashboard
        if ($role->name === 'admin') {
            return Inertia::render('Admin/Dashboard',[
                'auth' => [
                    'user' => [
                        'id' => auth()->user()->id,
                        'name' => auth()->user()->name,
                        'role' => auth()->user()->role->name, // Role Name
                        'role_id' => auth()->user()->role_id, // Role ID
                        'permissions' => auth()->user()->role->permissions->pluck('name')->toArray(), // Assigned Permissions
                    ]
                ]
            ]); 
        } elseif ($role->name === 'agent') {
            return Inertia::render('Agent/Dashboard',[
                'auth' => [
                    'user' => [
                        'id' => auth()->user()->id,
                        'name' => auth()->user()->name,
                        'role' => auth()->user()->role->name, // Role Name
                        'role_id' => auth()->user()->role_id, // Role ID
                        'permissions' => auth()->user()->role->permissions->pluck('name')->toArray(), // Assigned Permissions
                    ]
                ]
            ]);
        } else {
            return Inertia::render('User/Dashboard',[
                'auth' => [
                    'user' => [
                        'id' => auth()->user()->id,
                        'name' => auth()->user()->name,
                        'role' => auth()->user()->role->name, // Role Name
                        'role_id' => auth()->user()->role_id, // Role ID
                        'permissions' => auth()->user()->role->permissions->pluck('name')->toArray(), // Assigned Permissions
                    ]
                ]
            ]); 
        }
    }
}
