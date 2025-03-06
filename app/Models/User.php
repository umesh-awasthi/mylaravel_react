<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute; // Add this for casting
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // Add role to fillable attributes
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Add a role attribute casting
    protected function role(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ?? 'user', // Default to 'user' if not set
        );
    }
}
