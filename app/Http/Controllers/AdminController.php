<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\JobApplication;
use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard with statistics.
     */
    public function index()
    {
        $totalJobs = JobPosting::count();
        $activeJobs = JobPosting::where('status', 'active')->count();
        $totalUsers = User::where('role', 'job_seeker')->count();
        $totalApplications = JobApplication::count();
        $pendingApplications = JobApplication::where('status', 'pending')->count();
        
        // Recent applications
        $recentApplications = JobApplication::with(['user', 'jobPosting'])
            ->latest()
            ->take(5)
            ->get();
        
        // Application statistics
        $applicationStats = JobApplication::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->pluck('count', 'status')
            ->toArray();
        
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalJobs' => $totalJobs,
                'activeJobs' => $activeJobs,
                'totalUsers' => $totalUsers,
                'totalApplications' => $totalApplications,
                'pendingApplications' => $pendingApplications,
            ],
            'recentApplications' => $recentApplications,
            'applicationStats' => $applicationStats,
        ]);
    }
    

}