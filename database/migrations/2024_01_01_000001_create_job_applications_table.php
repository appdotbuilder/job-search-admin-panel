<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('job_posting_id')->constrained('job_postings')->onDelete('cascade');
            $table->text('cover_letter')->nullable()->comment('Cover letter content');
            $table->string('resume_path')->nullable()->comment('Path to resume file');
            $table->enum('status', ['pending', 'reviewed', 'accepted', 'rejected'])->default('pending')->comment('Application status');
            $table->timestamp('applied_at')->useCurrent()->comment('When the application was submitted');
            $table->timestamps();
            
            // Unique constraint - user can only apply once per job
            $table->unique(['user_id', 'job_posting_id']);
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('job_posting_id');
            $table->index('status');
            $table->index('applied_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};