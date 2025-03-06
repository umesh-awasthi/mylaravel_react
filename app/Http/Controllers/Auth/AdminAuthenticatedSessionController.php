<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Repositories\AdminRepository;
use App\Repositories\PermissionRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuthenticatedSessionController extends Controller
{
    protected $adminRepository;
    protected $permissionRepository;

    public function __construct(AdminRepository $adminRepository, PermissionRepository $permissionRepository)
    {
        $this->adminRepository = $adminRepository;
        $this->permissionRepository = $permissionRepository;
    }

    /**
     * Display the admin login view.
     */
    public function adminCreate(): Response
    {
        return Inertia::render('Auth/AdminLogin', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming admin authentication request.
     */
    public function adminStore(LoginRequest $request): RedirectResponse
    {
        // Check if the admin has permission
        if (!$this->adminRepository->hasPermission($request->email)) {
            return back()->withErrors([
                'email' => 'You do not have permission to access this area.',
            ]);
        }

        // Authenticate the admin
        $admin = $this->adminRepository->authenticate($request->email, $request->password);
        if ($admin) {
            $request->session()->regenerate();
            return redirect()->intended(route('admin.dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    /**
     * Log out the admin.
     */
    public function adminDestroy(Request $request): RedirectResponse
    {
        auth()->guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }

    /**
     * Show the create user form.
     */
    public function showCreateUserForm(): Response
    {
        return Inertia::render('Admin/CreateUser');
    }

    /**
     * Handle user creation request.
     */
    public function createUser(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'roles' => 'nullable|array',
            'permissions' => 'nullable|array',
        ]);

        $this->adminRepository->createUser(
            $validated,
            $request->input('roles', []),
            $request->input('permissions', [])
        );

        return redirect()->route('dashboard')
            ->with('status', 'User created successfully.');
    }
}
