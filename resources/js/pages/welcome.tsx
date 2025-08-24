import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface JobPosting {
    id: number;
    title: string;
    company: string;
    location: string;
    salary_range: string | null;
    employment_type: string;
    description: string;
    created_at: string;
}

interface Stats {
    totalJobs: number;
    totalCompanies: number;
}

interface Props {
    featuredJobs: JobPosting[];
    stats: Stats;
    [key: string]: unknown;
}

export default function Welcome({ featuredJobs, stats }: Props) {
    return (
        <>
            <Head title="Job Search Platform" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Navigation */}
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-indigo-600">
                                    💼 JobBoard Pro
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/jobs"
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Browse Jobs
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative py-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Find Your Dream Job Today 🚀
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Connect with top employers and discover amazing career opportunities. 
                            Our platform makes job searching simple, efficient, and successful.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/jobs">
                                <Button size="lg" className="px-8">
                                    🔍 Browse All Jobs
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button variant="outline" size="lg" className="px-8">
                                    👤 Job Seeker Login
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-indigo-600">
                                    {stats.totalJobs}+
                                </div>
                                <div className="text-gray-600">Active Jobs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-indigo-600">
                                    {stats.totalCompanies}+
                                </div>
                                <div className="text-gray-600">Companies</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Why Choose Our Platform? ⭐
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🎯</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Smart Job Matching</h3>
                                <p className="text-gray-600">
                                    Advanced search and filtering to find jobs that perfectly match your skills and preferences.
                                </p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Easy Application</h3>
                                <p className="text-gray-600">
                                    Apply to multiple jobs with just a few clicks. Track all your applications in one place.
                                </p>
                            </div>
                            
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🏢</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Top Companies</h3>
                                <p className="text-gray-600">
                                    Connect with leading companies across various industries looking for talented professionals.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Jobs */}
                {featuredJobs.length > 0 && (
                    <section className="py-16 px-4 bg-gray-50">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Latest Job Opportunities 💼
                                </h2>
                                <p className="text-lg text-gray-600">
                                    Discover fresh opportunities from top companies
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredJobs.map((job) => (
                                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <Badge variant="secondary">
                                                    {job.employment_type}
                                                </Badge>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(job.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <CardTitle className="text-lg">{job.title}</CardTitle>
                                            <CardDescription>
                                                <div className="space-y-1">
                                                    <div className="font-medium text-gray-900">
                                                        🏢 {job.company}
                                                    </div>
                                                    <div className="text-gray-600">
                                                        📍 {job.location}
                                                    </div>
                                                    {job.salary_range && (
                                                        <div className="text-green-600 font-medium">
                                                            💰 {job.salary_range}
                                                        </div>
                                                    )}
                                                </div>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm line-clamp-3">
                                                {job.description}
                                            </p>
                                        </CardContent>
                                        <CardFooter>
                                            <Link href={`/jobs/${job.id}`} className="w-full">
                                                <Button className="w-full">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                            
                            <div className="text-center mt-12">
                                <Link href="/jobs">
                                    <Button variant="outline" size="lg">
                                        View All Jobs →
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-16 px-4 bg-indigo-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            Ready to Start Your Job Search? 🎉
                        </h2>
                        <p className="text-xl text-indigo-100 mb-8">
                            Join thousands of professionals who have found their perfect job through our platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/jobs">
                                <Button size="lg" variant="secondary" className="px-8">
                                    🚀 Start Browsing Jobs
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-indigo-600">
                                    💼 Access My Account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">💼 JobBoard Pro</h3>
                                <p className="text-gray-400">
                                    Your trusted partner in finding the perfect career opportunity.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3">For Job Seekers</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
                                    <li><Link href="/login" className="hover:text-white">My Applications</Link></li>
                                    <li><Link href="/login" className="hover:text-white">Profile</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3">For Employers</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><Link href="/login" className="hover:text-white">Admin Panel</Link></li>
                                    <li><Link href="/login" className="hover:text-white">Post Jobs</Link></li>
                                    <li><Link href="/login" className="hover:text-white">Manage Applications</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3">Support</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>📧 support@jobboard.com</li>
                                    <li>📞 (555) 123-4567</li>
                                    <li>🕐 Mon-Fri 9AM-6PM</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 JobBoard Pro. All rights reserved. Built with Laravel & React.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}