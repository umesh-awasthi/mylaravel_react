<?php

namespace App\Repositories;

interface PermissionRepositoryInterface
{
    public function createPermission(array $data);
    public function getPermissionById($id);
    public function updatePermission($id, array $data);
    public function deletePermission($id);
    public function getAllPermissions();
}
