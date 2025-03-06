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


    public function authenticate(string $email, string $password): ?User
    {
        $admin = User::where('email', $email)->where('role', 'admin')->first();

        if ($admin && Hash::check($password, $admin->password)) {
            return $admin;
        }

        return null;
    }
}
