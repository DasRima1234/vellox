<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Services\BookingService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    //
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function index()
    {
        // Fetch all doctors from the DB and return as JSON
        return response()->json(\App\Models\Doctor::all());
    }
    public function getTimeSlots(Request $request, $id)
    {
        // 1. Find the doctor
        $doctor = \App\Models\Doctor::findOrFail($id);

        // 2. Get the date from the request (default to today if missing)
        $date = $request->query('date', now()->toDateString());

        // 3. Use the service to calculate slots (we'll make sure this exists next)
        $slots = $this->bookingService->getAvailableSlots($doctor, $date);

        return response()->json([
            'doctor' => $doctor->name,
            'date' => $date,
            'slots' => $slots
        ]);
    }
    public function storeDoctor(Request $request)
    {
        $data = $request->validate([
            // This 'unique:doctors,name' is the magic line
            'name' => 'required|string|unique:doctors,name|max:255',
            'speciality' => 'required|string|max:255',
        ]);

        $doctor = Doctor::create($data);

        return response()->json([
            'message' => 'Doctor created successfully!',
            'doctor' => $doctor
        ], 201);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'doctor_id'  => 'required|exists:doctors,id',
            'user_id'    => 'required|exists:users,id', // Ensure you have users in your table!
            'start_time' => 'required|date|after_or_equal:today',
            'end_time'   => 'required|date|after:start_time',
        ]);

        $doctor = Doctor::findOrFail($data['doctor_id']);
        $start = \Carbon\Carbon::parse($request->start_time);
        $end = \Carbon\Carbon::parse($request->end_time);

        // 1. Check Working Hours
        if ($start->format('H:i:s') < $doctor->work_start || $end->format('H:i:s') > $doctor->work_end) {
            return response()->json(['message' => 'Requested time is outside of doctor\'s working hours.'], 422);
        }

        if (!$this->bookingService->checkAvailability($doctor, $data['start_time'], $data['end_time'])) {
            return response()->json(['message' => 'Doctor is not available for the selected time slot.'], 409);
        }

        $booking = $doctor->bookings()->create([
            'user_id'    => auth()->id() ?? 1, // Fallback to user 1 for testing
            'start_time' => $data['start_time'],
            'end_time'   => $data['end_time'],
        ]);

        return response()->json([
            'message' => 'Booking confirmed!',
            'data'    => $booking
        ], 201);
    }

    public function search(Request $request)
    {
        $data = $request->validate([
            'start_time' => 'required|date|after:now',
            'end_time'   => 'required|date|after:start_time',
        ]);

        // Use the service to find free doctors
        $availableDoctors = $this->bookingService->getAvailableResources(
            Doctor::class,
            $data['start_time'],
            $data['end_time']
        );

        return response()->json([
            'available_doctors' => $availableDoctors
        ]);
    }

    public function userBookings($id)
    {
        $bookings = \App\Models\Booking::where('user_id', $id)
            ->with('bookable') // This loads the Doctor's name/speciality
            ->orderBy('start_time', 'asc')
            ->get();

        return response()->json($bookings);
    }

    public function destroy($id)
    {
        $booking = \App\Models\Booking::findOrFail($id);
        $booking->delete();
        return response()->json(['message' => 'Appointment cancelled successfully']);
    }
}
