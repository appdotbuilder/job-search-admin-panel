<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobApplicationRequest;
use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $applications = auth()->user()->applications()
            ->with('jobPosting')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('job-seeker/applications/index', [
            'applications' => $applications
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobApplicationRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['applied_at'] = now();
        
        // Handle resume upload if provided
        if ($request->hasFile('resume')) {
            $data['resume_path'] = $request->file('resume')->store('resumes', 'private');
        }

        // Check if user already applied for this job
        $existingApplication = JobApplication::where('user_id', auth()->id())
            ->where('job_posting_id', $data['job_posting_id'])
            ->first();
            
        if ($existingApplication) {
            return back()->withErrors(['job_posting_id' => 'You have already applied for this job.']);
        }

        JobApplication::create($data);

        return redirect()->route('jobs.show', $data['job_posting_id'])
            ->with('success', 'Application submitted successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(JobApplication $jobApplication)
    {
        // Ensure user can only see their own applications
        if ($jobApplication->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            abort(403);
        }
        
        $jobApplication->load(['jobPosting', 'user']);
        
        return Inertia::render('job-seeker/applications/show', [
            'application' => $jobApplication
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JobApplication $jobApplication)
    {
        // Only admins can update application status
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }
        
        $request->validate([
            'status' => 'required|string|in:pending,reviewed,accepted,rejected',
        ]);

        $jobApplication->update($request->only('status'));

        return back()->with('success', 'Application status updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobApplication $jobApplication)
    {
        // Users can only delete their own applications, admins can delete any
        if ($jobApplication->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            abort(403);
        }
        
        $jobApplication->delete();

        return redirect()->route('applications.index')
            ->with('success', 'Application deleted successfully.');
    }
}