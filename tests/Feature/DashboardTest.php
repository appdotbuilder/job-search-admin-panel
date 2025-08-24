<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->jobSeeker()->create());

    $response = $this->get('/dashboard');
    $response->assertRedirect('/jobs');
});

test('admin users are redirected to admin dashboard', function () {
    $this->actingAs($user = User::factory()->admin()->create());

    $response = $this->get('/dashboard');
    $response->assertRedirect('/admin/dashboard');
});
