<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    /**
     * Display a listing of available jobs for job seekers.
     */
    public function index(Request $request)
    {
        $query = JobPosting::active();
        
        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        // Filter by location
        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->get('location') . '%');
        }
        
        // Filter by employment type
        if ($request->filled('employment_type')) {
            $query->where('employment_type', $request->get('employment_type'));
        }
        
        $jobs = $query->latest()->paginate(12);
        
        // Get user's applications if authenticated
        $userApplications = [];
        if (auth()->check() && auth()->user()->isJobSeeker()) {
            $userApplications = JobApplication::where('user_id', auth()->id())
                ->pluck('job_posting_id')
                ->toArray();
        }
        
        return Inertia::render('jobs/index', [
            'jobs' => $jobs,
            'userApplications' => $userApplications,
            'filters' => $request->only(['search', 'location', 'employment_type'])
        ]);
    }

    /**
     * Display the specified job posting.
     */
    public function show(JobPosting $job)
    {
        // Check if current user has already applied for this job
        $hasApplied = false;
        if (auth()->check() && auth()->user()->isJobSeeker()) {
            $hasApplied = JobApplication::where('user_id', auth()->id())
                ->where('job_posting_id', $job->id)
                ->exists();
        }
        
        return Inertia::render('jobs/show', [
            'job' => $job,
            'hasApplied' => $hasApplied
        ]);
    }
}