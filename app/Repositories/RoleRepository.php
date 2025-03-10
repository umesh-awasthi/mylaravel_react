<?php

namespace App\Repositories;

use App\Models\Role;
use App\Models\Permission;

class RoleRepository
{
public function findRoleByName($roleName)
{
    return Role::where('name', $roleName)->first();
}

public function getAllRoles()

    {
        return Role::all();
    }

    public function createRole(array $data)
    {
        return Role::create($data);
    }

    public function findRoleById($roleId)
    {
        return Role::with('permissions')->findOrFail($roleId);
    }

    public function getRolePermissions(Role $role)
    {
        return $role->permissions->pluck('name')->toArray();
    }

    public function syncPermissions(Role $role, array $permissionIds)
    {
        return $role->permissions()->sync($permissionIds);
    }

    public function getRoleWithPermissions($roleId)
    {
        $role = Role::with('permissions')->findOrFail($roleId);
        $allPermissions = Permission::all();

        return [
            'role' => $role,
            'permissions' => $allPermissions->map(function ($permission) use ($role) {
                return [
                    'name' => $permission->id,
                    'name' => $permission->name,
                    'parent_id' => $permission->parent_id, // Handles parent-child structure
                    'assigned' => $role->permissions->contains($permission->id)
                ];
            }),
        ];
    }
}
