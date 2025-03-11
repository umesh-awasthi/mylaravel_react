<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'image',       // Added column for property image
        'category_id', // Added column for category ID
    ];

    /**
     * Relationship: Each property belongs to a category.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
