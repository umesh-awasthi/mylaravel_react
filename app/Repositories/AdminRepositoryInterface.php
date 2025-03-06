<?php

namespace App\Repositories;

interface AdminRepositoryInterface
{
    public function createUser(array $data);
    public function getUserById($id);
    public function updateUser($id, array $data);
    public function deleteUser($id);
    public function getAllUsers();
}
