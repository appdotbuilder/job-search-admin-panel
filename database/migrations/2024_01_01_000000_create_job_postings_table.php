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
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Job title');
            $table->text('description')->comment('Job description');
            $table->string('company')->comment('Company name');
            $table->string('location')->comment('Job location');
            $table->string('salary_range')->nullable()->comment('Salary range');
            $table->string('employment_type')->default('full-time')->comment('Employment type (full-time, part-time, contract)');
            $table->text('requirements')->nullable()->comment('Job requirements');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Job posting status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('title');
            $table->index('company');
            $table->index('location');
            $table->index('status');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};