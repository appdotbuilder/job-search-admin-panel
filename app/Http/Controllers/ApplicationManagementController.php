<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationManagementController extends Controller
{
    /**
     * Display all applications for admin review.
     */
    public function index(Request $request)
    {
        $query = JobApplication::with(['user', 'jobPosting']);
        
        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }
        
        // Filter by job posting
        if ($request->filled('job_posting_id')) {
            $query->where('job_posting_id', $request->get('job_posting_id'));
        }
        
        $applications = $query->latest()
            ->paginate(15);
        
        // Get job postings for filter dropdown
        $jobPostings = JobPosting::select('id', 'title', 'company')
            ->orderBy('title')
            ->get();
        
        return Inertia::render('admin/applications/index', [
            'applications' => $applications,
            'jobPostings' => $jobPostings,
            'filters' => $request->only(['status', 'job_posting_id'])
        ]);
    }
}