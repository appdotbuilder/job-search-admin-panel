<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobPosting>
 */
class JobPostingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companies = [
            'Tech Innovations Inc.', 'Digital Solutions Ltd.', 'Future Systems Corp.',
            'Creative Media Group', 'Advanced Analytics Co.', 'Smart Technologies',
            'Global Dynamics LLC', 'Innovative Software House', 'Modern Enterprises',
            'NextGen Solutions', 'Quantum Computing Co.', 'Data Science Partners'
        ];
        
        $locations = [
            'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA',
            'Chicago, IL', 'Boston, MA', 'Los Angeles, CA', 'Denver, CO',
            'Atlanta, GA', 'Remote', 'Miami, FL', 'Portland, OR'
        ];
        
        $jobTitles = [
            'Software Engineer', 'Senior Developer', 'Product Manager', 'UX Designer',
            'Data Scientist', 'DevOps Engineer', 'Frontend Developer', 'Backend Developer',
            'Full Stack Developer', 'Marketing Manager', 'Sales Representative',
            'Business Analyst', 'Project Manager', 'Quality Assurance Engineer'
        ];
        
        $employmentTypes = ['full-time', 'part-time', 'contract'];
        
        return [
            'title' => fake()->randomElement($jobTitles),
            'description' => fake()->paragraphs(3, true),
            'company' => fake()->randomElement($companies),
            'location' => fake()->randomElement($locations),
            'salary_range' => fake()->randomElement([
                '$50,000 - $70,000',
                '$70,000 - $90,000',
                '$90,000 - $120,000',
                '$120,000 - $150,000',
                '$150,000 - $200,000',
                'Competitive salary',
                'DOE'
            ]),
            'employment_type' => fake()->randomElement($employmentTypes),
            'requirements' => fake()->paragraphs(2, true),
            'status' => fake()->randomElement(['active', 'active', 'active', 'inactive']), // 75% active
        ];
    }
}