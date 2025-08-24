<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobPostingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() && auth()->user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'employment_type' => 'required|string|in:full-time,part-time,contract',
            'requirements' => 'nullable|string',
            'status' => 'sometimes|string|in:active,inactive',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Job title is required.',
            'description.required' => 'Job description is required.',
            'company.required' => 'Company name is required.',
            'location.required' => 'Job location is required.',
            'employment_type.required' => 'Employment type is required.',
            'employment_type.in' => 'Employment type must be full-time, part-time, or contract.',
        ];
    }
}