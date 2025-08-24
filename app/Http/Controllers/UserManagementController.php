<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request)
    {
        $query = User::query();
        
        // Filter by role if specified
        if ($request->filled('role')) {
            $query->where('role', $request->get('role'));
        }
        
        // Search by name or email
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }
        
        $users = $query->withCount('applications')
            ->latest()
            ->paginate(15);
        
        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => $request->only(['search', 'role'])
        ]);
    }
    
    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        return Inertia::render('admin/users/create');
    }
    
    /**
     * Store a newly created user.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $data['email_verified_at'] = now();
        
        $user = User::create($data);

        return redirect()->route('users.index')
            ->with('success', 'User created successfully.');
    }
}