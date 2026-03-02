<?php

namespace App\Services;

use App\Models\Doctor;
use Illuminate\Support\Facades\DB;

class MaintenanceService
{
    public function mergeDuplicates(string $name)
    {
        return DB::transaction(function () use ($name) {
            $doctors = Doctor::where('name', $name)->orderBy('id')->get();

            if ($doctors->count() <= 1) {
                return [
                    'status' => 'info',
                    'message' => "No duplicates found for '{$name}'."
                ];
            }

            $master = $doctors->shift(); // Keep the first record
            $count = $doctors->count();

            foreach ($doctors as $duplicate) {
                // Transfer all bookings to the master record
                $duplicate->bookings()->update(['bookable_id' => $master->id]);
                $duplicate->delete();
            }

            return [
                'status' => 'success',
                'message' => "Successfully merged {$count} duplicates into ID {$master->id}."
            ];
        });
    }
}