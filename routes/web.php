<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplicationManagementController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{job}', [JobController::class, 'show'])->name('jobs.show');

// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        if ($user && $user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('jobs.index');
    })->name('dashboard');
    
    // Job seeker routes
    Route::middleware(\App\Http\Middleware\CheckJobSeeker::class)->group(function () {
        Route::resource('applications', JobApplicationController::class)->only(['index', 'store', 'show', 'destroy']);
    });
    
    // Admin routes
    Route::middleware(\App\Http\Middleware\CheckAdmin::class)->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
        Route::resource('job-postings', JobPostingController::class);
        Route::patch('/applications/{jobApplication}', [JobApplicationController::class, 'update'])->name('applications.update');
    });
    
    // User management routes (admin only)
    Route::middleware(\App\Http\Middleware\CheckAdmin::class)->group(function () {
        Route::resource('users', UserManagementController::class)->only(['index', 'create', 'store']);
        Route::resource('applications', ApplicationManagementController::class)->only(['index']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';