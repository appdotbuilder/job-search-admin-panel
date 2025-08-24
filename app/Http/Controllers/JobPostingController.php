<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobPostingRequest;
use App\Http\Requests\UpdateJobPostingRequest;
use App\Models\JobPosting;
use Inertia\Inertia;

class JobPostingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobPostings = JobPosting::with('applications')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('admin/job-postings/index', [
            'jobPostings' => $jobPostings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/job-postings/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobPostingRequest $request)
    {
        $jobPosting = JobPosting::create($request->validated());

        return redirect()->route('job-postings.show', $jobPosting)
            ->with('success', 'Job posting created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(JobPosting $jobPosting)
    {
        $jobPosting->load(['applications.user']);
        
        return Inertia::render('admin/job-postings/show', [
            'jobPosting' => $jobPosting
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobPosting $jobPosting)
    {
        return Inertia::render('admin/job-postings/edit', [
            'jobPosting' => $jobPosting
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobPostingRequest $request, JobPosting $jobPosting)
    {
        $jobPosting->update($request->validated());

        return redirect()->route('job-postings.show', $jobPosting)
            ->with('success', 'Job posting updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobPosting $jobPosting)
    {
        $jobPosting->delete();

        return redirect()->route('job-postings.index')
            ->with('success', 'Job posting deleted successfully.');
    }
}