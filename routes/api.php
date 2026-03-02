<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\BookingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/doctors', [BookingController::class, 'storeDoctor']);
Route::post('/bookings', [BookingController::class, 'store']);
Route::post('/admin/doctors/deduplicate', [AdminController::class, 'deduplicateDoctors']);
Route::get('/doctors/available', [BookingController::class, 'search']);
Route::get('/doctors', [BookingController::class, 'index']);
Route::get('/doctors/{id}/slots', [BookingController::class, 'getTimeSlots']);
// Get all bookings for a specific user
Route::get('/users/{id}/bookings', [BookingController::class, 'userBookings']);
// Cancel an appointment
Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);