<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\AdminRepository;
use App\Repositories\PropertyRepository;
use App\Repositories\RoleRepository;
use App\Repositories\PermissionRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Bind repositories to the service container
$this->app->bind('App\Repositories\AdminRepository', function ($app) {
    return new AdminRepository($app->make(RoleRepository::class));
});


        $this->app->bind('App\Repositories\PropertyRepository', function ($app) {
            return new PropertyRepository();
        });

        $this->app->bind('App\Repositories\RoleRepository', function ($app) {
            return new RoleRepository();
        });

        $this->app->bind('App\Repositories\PermissionRepository', function ($app) {
            return new PermissionRepository();
        });
    }

    public function boot()
    {
        //
    }
}
