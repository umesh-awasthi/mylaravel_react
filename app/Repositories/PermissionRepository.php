<?php

namespace App\Repositories;

use App\Models\Permission;

class PermissionRepository
{
    public function getAllPermissions()
    {
        return Permission::all();
    }

    public function createPermission(array $data)
    {
        return Permission::create($data);
    }
}
