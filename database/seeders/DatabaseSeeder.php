<?php

namespace Database\Seeders;

use App\Models\User; // Add User model for seeding
use App\Models\Property; // Add Property model for seeding
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed an admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin001@gmail.com',
            'password' => bcrypt('Admin@001'), // Use a secure password
            'role' => 'admin', // Set role to admin
        ]);

        // Seed properties
        Property::create([
            'name' => 'Property 1',
            'description' => 'Description for Property 1',
            'price' => 100000,
        
        ]);

        Property::create([
            'name' => 'Property 2',
            'description' => 'Description for Property 2',
            'price' => 150000,
           
        ]);

        // // Optionally seed a test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
        ]);
    }
}
