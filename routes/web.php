<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AdminAuthenticatedSessionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

use App\Http\Controllers\PropertyController;

Route::middleware('auth')->group(function () {
    Route::resource('properties', PropertyController::class);
});

Route::prefix('admin')->group(function () {
    // Authentication
    Route::get('/login', [AdminAuthenticatedSessionController::class, 'adminCreate'])
        ->name('admin.login');
    Route::post('/login', [AdminAuthenticatedSessionController::class, 'adminStore'])
        ->name('admin.login.store');

    // User Management
    // User Management
    Route::get('/users/create', [AdminAuthenticatedSessionController::class, 'showCreateUserForm'])
       ->name('admin.users.create'); // New GET route for user creation

    Route::post('/users', [AdminAuthenticatedSessionController::class, 'createUser'])
        ->name('admin.users.create');

    // Role Management
    Route::get('/roles', [RoleController::class, 'index'])->name('admin.roles.index');
    Route::get('/roles/create', [RoleController::class, 'create'])->name('admin.roles.create');
    Route::post('/roles', [RoleController::class, 'store'])->name('admin.roles.store');
    Route::get('/roles/{role}/assign-permissions', [RoleController::class, 'showAssignPermissions'])
        ->name('admin.roles.assign-permissions');
    Route::post('/roles/{role}/assign-permissions', [RoleController::class, 'assignPermissions'])
        ->name('admin.roles.assign-permissions.store');

    // Permission Management
    Route::get('/permissions', [PermissionController::class, 'index'])->name('admin.permissions.index');
    Route::get('/permissions/create', [PermissionController::class, 'create'])->name('admin.permissions.create');
    Route::post('/permissions', [PermissionController::class, 'store'])->name('admin.permissions.store');
});

require __DIR__.'/auth.php';
