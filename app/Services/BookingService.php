<?php

namespace App\Services;

use App\Models\Booking;
use Carbon\Carbon;

class BookingService
{
    public function checkAvailability($model, $start, $end)
{
    // Use the raw strings first to ensure no timezone shifting is hiding the booking
    return !Booking::where('bookable_type', get_class($model))
        ->where('bookable_id', $model->id)
        ->where(function ($query) use ($start, $end) {
            $query->where('start_time', '<', $end)
                  ->where('end_time', '>', $start);
        })
        ->exists();
}

    public function getAvailableResources(string $modelClass, $startTime, $endTime)
    {
        $requestedStart = \Carbon\Carbon::parse($startTime);
        $requestedEnd = \Carbon\Carbon::parse($endTime);

        // Return resources that DON'T have a booking overlapping the requested time
        return $modelClass::whereDoesntHave('bookings', function ($query) use ($startTime, $endTime) {
            $query->where(function ($q) use ($startTime, $endTime) {
                $q->where('start_time', '<', $endTime)
                    ->where('end_time', '>', $startTime);
            });
        })->whereDate('work_days', 'like', '%' . $requestedStart->format('l') . '%')
            ->whereTime('work_start', '<=', $requestedStart->format('H:i:s'))
            ->whereTime('work_end', '>=', $requestedEnd->format('H:i:s'))
            ->get();
    }

    public function getAvailableSlots($bookable, $date)
    {
        $slots = [];

        $timezone = $bookable->timezone ?? config('app.timezone');

        // Current time in doctor's timezone
        $now = Carbon::now($timezone);

        // Work hours in doctor's timezone
        $current = Carbon::parse($date . ' ' . $bookable->work_start, $timezone);
        $end     = Carbon::parse($date . ' ' . $bookable->work_end, $timezone);

        while ($current->copy()->addMinutes(30) <= $end) {

            $slotStart = $current->copy();
            $slotEnd   = $current->copy()->addMinutes(30);

            $isPast = false;

            // Only disable past slots if date is today
            if ($slotStart->toDateString() === $now->toDateString()) {
                $isPast = $slotStart->lessThanOrEqualTo($now);
            }

            // Convert to UTC before DB check
            $utcStart = $slotStart->copy();
            $utcEnd   = $slotEnd->copy();

            $isBooked = !$this->checkAvailability(
                $bookable,
                $utcStart,
                $utcEnd
            );

            $slots[] = [
                'start'     => $slotStart->format('H:i'),
                'end'       => $slotEnd->format('H:i'),
                'available' => !$isPast && !$isBooked,
                'reason'    => $isPast ? 'past' : ($isBooked ? 'booked' : 'available'),
            ];

            $current->addMinutes(30);
        }

        return $slots;
    }
}
