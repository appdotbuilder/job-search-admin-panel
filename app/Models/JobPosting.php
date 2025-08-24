<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\JobPosting
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $company
 * @property string $location
 * @property string|null $salary_range
 * @property string $employment_type
 * @property string|null $requirements
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\JobApplication[] $applications
 * @property-read int|null $applications_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting query()
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereSalaryRange($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereEmploymentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereRequirements($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobPosting active()
 * @method static \Database\Factories\JobPostingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class JobPosting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'company',
        'location',
        'salary_range',
        'employment_type',
        'requirements',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the applications for the job posting.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    /**
     * Scope a query to only include active job postings.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}