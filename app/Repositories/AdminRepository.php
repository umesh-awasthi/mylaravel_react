<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminRepository
{
    public function canManageProperty($property): bool
    {
        // Allow all admins to manage properties
        return true; 
    }

    public function createUser(array $data, array $roles = [], array $permissions = []): User
{
    // Determine the primary role for storage in the 'role' column
    $primaryRole = count($roles) > 0 ? $roles[0] : 'user'; // Default to 'user' if no role is assigned

    // Create the user with the role
    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
        'role' => $primaryRole, // Store role in 'users' table
    ]);

    // Assign roles to the pivot table
    if (!empty($roles)) {
        $user->roles()->sync($roles);
    }

    // Assign permissions if provided
    if (!empty($permissions)) {
        $user->permissions()->sync($permissions);
    }

    return $user;
}


    public function assignRoles(User $user, array $roles): void
    {
        $user->roles()->sync($roles);
    }

    public function assignPermissions(User $user, array $permissions): void
    {
        $user->permissions()->sync($permissions);
    }

    public function authenticate(string $email, string $password): ?User
    {
        $admin = User::where('email', $email)->where('role', 'admin')->first();

        if ($admin && Hash::check($password, $admin->password)) {
            return $admin;
        }

        return null;
    }
}
