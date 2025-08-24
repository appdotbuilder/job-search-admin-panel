<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->admin()->create([
            'name' => 'Admin User',
            'email' => 'test@example.com',
            'bio' => 'System administrator with full access to manage job postings and users.',
        ]);

        // Create test job seeker
        User::factory()->jobSeeker()->create([
            'name' => 'John Doe',
            'email' => 'jobseeker@example.com',
            'bio' => 'Experienced software developer looking for new opportunities.',
            'skills' => 'JavaScript, React, Node.js, Python, SQL, Git',
        ]);

        // Create additional job seekers
        $jobSeekers = User::factory()->jobSeeker()->count(20)->create();

        // Create job postings
        $jobPostings = JobPosting::factory()->count(25)->create();

        // Create job applications
        foreach ($jobSeekers->take(15) as $jobSeeker) {
            // Each job seeker applies to 1-5 random jobs
            $randomJobs = $jobPostings->random(random_int(1, 5));
            
            foreach ($randomJobs as $job) {
                JobApplication::factory()->create([
                    'user_id' => $jobSeeker->id,
                    'job_posting_id' => $job->id,
                ]);
            }
        }
    }
}