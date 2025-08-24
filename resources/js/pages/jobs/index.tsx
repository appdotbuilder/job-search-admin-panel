import React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface PaginatedJobs {
    data: JobPosting[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Filters {
    search?: string;
    location?: string;
    employment_type?: string;
}

interface Props {
    jobs: PaginatedJobs;
    userApplications: number[];
    filters: Filters;
    [key: string]: unknown;
}

export default function JobsIndex({ jobs, userApplications, filters }: Props) {
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        location: filters.location || '',
        employment_type: filters.employment_type || '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('jobs.index'));
    };

    const clearFilters = () => {
        setData({
            search: '',
            location: '',
            employment_type: '',
        });
        router.get(route('jobs.index'));
    };

    return (
        <AppShell>
            <Head title="Browse Jobs" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            🔍 Browse Jobs
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Discover {jobs.total} amazing career opportunities
                        </p>
                    </div>
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Input
                                    placeholder="🔍 Search jobs, companies..."
                                    value={data.search}
                                    onChange={(e) => setData('search', e.target.value)}
                                />
                                <Input
                                    placeholder="📍 Location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                                <Select 
                                    value={data.employment_type} 
                                    onValueChange={(value) => setData('employment_type', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Employment Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Types</SelectItem>
                                        <SelectItem value="full-time">Full Time</SelectItem>
                                        <SelectItem value="part-time">Part Time</SelectItem>
                                        <SelectItem value="contract">Contract</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={processing}>
                                        Search
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={clearFilters}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Jobs Grid */}
                {jobs.data.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <div className="text-6xl mb-4">😔</div>
                            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                            <p className="text-gray-600">
                                Try adjusting your search criteria or check back later for new opportunities.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.data.map((job) => (
                            <Card key={job.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge 
                                            variant={job.employment_type === 'full-time' ? 'default' : 'secondary'}
                                        >
                                            {job.employment_type}
                                        </Badge>
                                        {userApplications.includes(job.id) && (
                                            <Badge variant="outline" className="bg-green-50 text-green-700">
                                                ✅ Applied
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-lg line-clamp-2">
                                        {job.title}
                                    </CardTitle>
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
                                            <div className="text-sm text-gray-500">
                                                📅 {new Date(job.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {job.description}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Link href={route('jobs.show', job.id)} className="w-full">
                                        <Button className="w-full">
                                            View Details & Apply
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {jobs.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {jobs.current_page > 1 && (
                            <Button
                                variant="outline"
                                onClick={() => router.get(route('jobs.index'), {
                                    ...data,
                                    page: jobs.current_page - 1
                                })}
                            >
                                ← Previous
                            </Button>
                        )}
                        
                        <span className="flex items-center px-4 py-2 text-sm text-gray-600">
                            Page {jobs.current_page} of {jobs.last_page}
                        </span>
                        
                        {jobs.current_page < jobs.last_page && (
                            <Button
                                variant="outline"
                                onClick={() => router.get(route('jobs.index'), {
                                    ...data,
                                    page: jobs.current_page + 1
                                })}
                            >
                                Next →
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </AppShell>
    );
}