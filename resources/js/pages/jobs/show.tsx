import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface JobPosting {
    id: number;
    title: string;
    company: string;
    location: string;
    salary_range: string | null;
    employment_type: string;
    description: string;
    requirements: string | null;
    created_at: string;
}

interface Props {
    job: JobPosting;
    hasApplied: boolean;
    [key: string]: unknown;
}

export default function JobShow({ job, hasApplied }: Props) {
    const [isApplicationOpen, setIsApplicationOpen] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        job_posting_id: job.id,
        cover_letter: '',
        resume: null as File | null,
    });

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('applications.store'), {
            onSuccess: () => {
                setIsApplicationOpen(false);
            }
        });
    };

    // For now, assume unauthenticated on public job pages
    // This will be properly handled when auth is implemented
    const isAuthenticated = false;
    const isJobSeeker = false;

    return (
        <AppShell>
            <Head title={`${job.title} at ${job.company}`} />
            
            <div className="space-y-6">
                {/* Back Button */}
                <div>
                    <Link href="/jobs">
                        <Button variant="ghost" size="sm">
                            ← Back to Jobs
                        </Button>
                    </Link>
                </div>

                {/* Job Header */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Badge 
                                        variant={job.employment_type === 'full-time' ? 'default' : 'secondary'}
                                    >
                                        {job.employment_type}
                                    </Badge>
                                    {hasApplied && (
                                        <Badge variant="outline" className="bg-green-50 text-green-700">
                                            ✅ Applied
                                        </Badge>
                                    )}
                                </div>
                                <div>
                                    <CardTitle className="text-3xl">
                                        {job.title}
                                    </CardTitle>
                                    <CardDescription className="text-lg mt-2">
                                        <div className="space-y-2">
                                            <div className="font-semibold text-gray-900">
                                                🏢 {job.company}
                                            </div>
                                            <div className="flex items-center gap-4 text-gray-600">
                                                <span>📍 {job.location}</span>
                                                {job.salary_range && (
                                                    <span className="text-green-600 font-medium">
                                                        💰 {job.salary_range}
                                                    </span>
                                                )}
                                                <span>📅 Posted {new Date(job.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </CardDescription>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-end">
                            {!isAuthenticated ? (
                                <div className="flex gap-3">
                                    <Link href="/login">
                                        <Button>Login to Apply</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button variant="outline">Register</Button>
                                    </Link>
                                </div>
                            ) : !isJobSeeker ? (
                                <Button disabled>
                                    Admin Account - Cannot Apply
                                </Button>
                            ) : hasApplied ? (
                                <div className="flex gap-3">
                                    <Button disabled>
                                        ✅ Application Submitted
                                    </Button>
                                    <Link href="/applications">
                                        <Button variant="outline">
                                            View My Applications
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="lg" className="px-8">
                                            🚀 Apply Now
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <form onSubmit={handleApply}>
                                            <DialogHeader>
                                                <DialogTitle>Apply for {job.title}</DialogTitle>
                                                <DialogDescription>
                                                    Submit your application to {job.company}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div>
                                                    <Label htmlFor="cover_letter">Cover Letter (Optional)</Label>
                                                    <Textarea
                                                        id="cover_letter"
                                                        placeholder="Tell the employer why you're interested in this position..."
                                                        value={data.cover_letter}
                                                        onChange={(e) => setData('cover_letter', e.target.value)}
                                                        className="min-h-[120px]"
                                                    />
                                                    {errors.cover_letter && (
                                                        <p className="text-sm text-red-600 mt-1">{errors.cover_letter}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <Label htmlFor="resume">Resume (Optional)</Label>
                                                    <Input
                                                        id="resume"
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={(e) => setData('resume', e.target.files?.[0] || null)}
                                                    />
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        PDF, DOC, or DOCX files only (max 2MB)
                                                    </p>
                                                    {errors.resume && (
                                                        <p className="text-sm text-red-600 mt-1">{errors.resume}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button 
                                                    type="button" 
                                                    variant="outline" 
                                                    onClick={() => setIsApplicationOpen(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" disabled={processing}>
                                                    {processing ? 'Submitting...' : 'Submit Application'}
                                                </Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Job Details */}
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>📝 Job Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                        {job.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Requirements */}
                        {job.requirements && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>✅ Requirements</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose max-w-none">
                                        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                            {job.requirements}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>📊 Job Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Employment Type</Label>
                                    <p className="capitalize">{job.employment_type}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Location</Label>
                                    <p>{job.location}</p>
                                </div>
                                {job.salary_range && (
                                    <div>
                                        <Label className="text-sm font-medium text-gray-500">Salary Range</Label>
                                        <p className="text-green-600 font-medium">{job.salary_range}</p>
                                    </div>
                                )}
                                <div>
                                    <Label className="text-sm font-medium text-gray-500">Posted Date</Label>
                                    <p>{new Date(job.created_at).toLocaleDateString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>🎯 Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href="/jobs" className="block">
                                    <Button variant="outline" className="w-full">
                                        🔍 Browse More Jobs
                                    </Button>
                                </Link>
                                {isAuthenticated && isJobSeeker && (
                                    <Link href="/applications" className="block">
                                        <Button variant="outline" className="w-full">
                                            📋 My Applications
                                        </Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}