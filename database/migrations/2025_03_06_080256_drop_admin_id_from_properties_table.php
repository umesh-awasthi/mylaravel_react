<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropForeign(['admin_id']); // Drop the foreign key constraint
        $table->dropColumn('admin_id'); // Drop the admin_id column
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->foreignId('admin_id')->constrained('users')->onDelete('cascade'); // Re-add the column if rolling back
        });
    }
};
