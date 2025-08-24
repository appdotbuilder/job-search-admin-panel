<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page.
     */
    public function index()
    {
        // Get some featured jobs to display
        $featuredJobs = JobPosting::active()
            ->latest()
            ->take(6)
            ->get();
        
        $stats = [
            'totalJobs' => JobPosting::active()->count(),
            'totalCompanies' => JobPosting::active()->distinct('company')->count(),
        ];
        
        return Inertia::render('welcome', [
            'featuredJobs' => $featuredJobs,
            'stats' => $stats,
        ]);
    }
}