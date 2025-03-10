<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\RoleRepository;
use App\Repositories\PermissionRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    protected $roleRepository;
    protected $permissionRepository;

    public function __construct(RoleRepository $roleRepository, PermissionRepository $permissionRepository)
    {
        $this->roleRepository = $roleRepository;
        $this->permissionRepository = $permissionRepository;
    }

    public function index()
    {
        $roles = $this->roleRepository->getAllRoles();
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Roles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles',
        ]);

        $this->roleRepository->createRole($validated);

        return redirect()->route('admin.roles.index')
            ->with('success', 'Role created successfully.');
    }

    public function showAssignPermissions($roleId)
    {
        $role = $this->roleRepository->findRoleById($roleId);
        $allPermissions = $this->permissionRepository->getAllPermissions();
        $rolePermissions = $role->permissions->pluck('id')->toArray();

        return Inertia::render('Admin/Roles/AssignPermissions', [
            'role' => $role,
            'permissions' => $allPermissions->map(function ($permission) use ($rolePermissions) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'parent_id' => $permission->parent_id, // Ensure parent-child relationships
                    'assigned' => in_array($permission->id, $rolePermissions)
                ];
            })
        ]);
    }

    public function assignPermissions(Request $request, $roleId)
    {
        $validated = $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id',
        ]);
       
        $role = $this->roleRepository->findRoleById($roleId);
        $this->roleRepository->syncPermissions($role, $validated['permissions'] ?? []);

        return back()->with('success', 'Permissions updated successfully.');
    }
}
