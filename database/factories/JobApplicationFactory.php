<?php

namespace Database\Factories;

use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobApplication>
 */
class JobApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'job_posting_id' => JobPosting::factory(),
            'cover_letter' => fake()->paragraphs(3, true),
            'resume_path' => null, // Would be uploaded files in real scenario
            'status' => fake()->randomElement(['pending', 'pending', 'reviewed', 'accepted', 'rejected']),
            'applied_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }
}