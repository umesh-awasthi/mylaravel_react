<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminAuthenticatedSessionController extends Controller
{
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
        // Use repository to authenticate admin and check permissions
        if (!$this->adminRepository->hasPermission($request->email)) {
            return back()->withErrors([
                'email' => 'You do not have permission to access this area.',
            ]);
        }
        $admin = $this->adminRepository->authenticate($request->email, $request->password);
        if ($admin) {
            $request->session()->regenerate();
            return redirect()->intended(route('admin.dashboard', absolute: false));
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
}
