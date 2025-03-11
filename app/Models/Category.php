<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = ['name'];

    /**
     * A category can have many properties.
     */
    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }
}
