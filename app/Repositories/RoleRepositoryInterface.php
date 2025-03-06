<?php

namespace App\Repositories;

interface RoleRepositoryInterface
{
    public function createRole(array $data);
    public function getRoleById($id);
    public function updateRole($id, array $data);
    public function deleteRole($id);
    public function getAllRoles();
}
