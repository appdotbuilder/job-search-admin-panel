<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\JobApplication
 *
 * @property int $id
 * @property int $user_id
 * @property int $job_posting_id
 * @property string|null $cover_letter
 * @property string|null $resume_path
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $applied_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\JobPosting $jobPosting
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication query()
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication whereJobPostingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication whereCoverLetter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication whereResumePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication whereAppliedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JobApplication whereUpdatedAt($value)
 * @method static \Database\Factories\JobApplicationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class JobApplication extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'job_posting_id',
        'cover_letter',
        'resume_path',
        'status',
        'applied_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'applied_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that submitted the application.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the job posting for this application.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function jobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class);
    }
}