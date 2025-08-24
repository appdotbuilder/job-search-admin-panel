import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Stats {
    totalJobs: number;
    activeJobs: number;
    totalUsers: number;
    totalApplications: number;
    pendingApplications: number;
}

interface Application {
    id: number;
    status: string;
    applied_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    job_posting: {
        id: number;
        title: string;
        company: string;
    };
}

interface Props {
    stats: Stats;
    recentApplications: Application[];
    applicationStats: Record<string, number>;
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentApplications, applicationStats }: Props) {
    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        🏢 Admin Dashboard
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Manage your job board and monitor activity
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                            <div className="text-2xl">💼</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalJobs}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.activeJobs} active postings
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Job Seekers</CardTitle>
                            <div className="text-2xl">👥</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalUsers}</div>
                            <p className="text-xs text-muted-foreground">
                                Registered users
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Applications</CardTitle>
                            <div className="text-2xl">📝</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalApplications}</div>
                            <p className="text-xs text-muted-foreground">
                                Total submissions
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                            <div className="text-2xl">⏳</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                {stats.pendingApplications}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Need attention
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                            <div className="text-2xl">✅</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.activeJobs}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Currently hiring
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>🚀 Quick Actions</CardTitle>
                        <CardDescription>
                            Common administrative tasks
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/admin/job-postings/create">
                                <Button className="w-full">
                                    ➕ Create Job
                                </Button>
                            </Link>
                            <Link href="/admin/users/create">
                                <Button variant="outline" className="w-full">
                                    👤 Add User
                                </Button>
                            </Link>
                            <Link href="/admin/job-postings">
                                <Button variant="outline" className="w-full">
                                    📋 Manage Jobs
                                </Button>
                            </Link>
                            <Link href="/admin/applications">
                                <Button variant="outline" className="w-full">
                                    📊 View Applications
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Applications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📬 Recent Applications</CardTitle>
                            <CardDescription>
                                Latest job applications submitted
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentApplications.length === 0 ? (
                                    <p className="text-center text-gray-500 py-4">
                                        No applications yet
                                    </p>
                                ) : (
                                    recentApplications.map((application) => (
                                        <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="space-y-1">
                                                <p className="font-medium">{application.user.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    {application.job_posting.title} at {application.job_posting.company}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Applied {new Date(application.applied_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Badge 
                                                variant={
                                                    application.status === 'pending' ? 'secondary' :
                                                    application.status === 'accepted' ? 'default' : 'outline'
                                                }
                                            >
                                                {application.status}
                                            </Badge>
                                        </div>
                                    ))
                                )}
                            </div>
                            {recentApplications.length > 0 && (
                                <div className="mt-4">
                                    <Link href="/admin/applications">
                                        <Button variant="outline" className="w-full">
                                            View All Applications
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Application Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📈 Application Statistics</CardTitle>
                            <CardDescription>
                                Breakdown of application statuses
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Object.entries(applicationStats).map(([status, count]) => (
                                    <div key={status} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${
                                                status === 'pending' ? 'bg-yellow-400' :
                                                status === 'reviewed' ? 'bg-blue-400' :
                                                status === 'accepted' ? 'bg-green-400' :
                                                'bg-red-400'
                                            }`} />
                                            <span className="capitalize">{status}</span>
                                        </div>
                                        <Badge variant="outline">{count}</Badge>
                                    </div>
                                ))}
                            </div>
                            
                            {Object.keys(applicationStats).length === 0 && (
                                <p className="text-center text-gray-500 py-4">
                                    No application data available
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Management Links */}
                <Card>
                    <CardHeader>
                        <CardTitle>⚙️ Management</CardTitle>
                        <CardDescription>
                            Access detailed management interfaces
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Link href="/admin/job-postings" className="block">
                                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardHeader className="text-center">
                                        <div className="text-4xl mb-2">💼</div>
                                        <CardTitle className="text-lg">Job Postings</CardTitle>
                                        <CardDescription>
                                            Create, edit, and manage all job listings
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>

                            <Link href="/admin/users" className="block">
                                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardHeader className="text-center">
                                        <div className="text-4xl mb-2">👥</div>
                                        <CardTitle className="text-lg">User Management</CardTitle>
                                        <CardDescription>
                                            Manage job seekers and admin accounts
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>

                            <Link href="/admin/applications" className="block">
                                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardHeader className="text-center">
                                        <div className="text-4xl mb-2">📋</div>
                                        <CardTitle className="text-lg">Applications</CardTitle>
                                        <CardDescription>
                                            Review and process job applications
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}