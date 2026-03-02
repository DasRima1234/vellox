<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Doctor extends Model
{
    // These are the only columns we allow to be mass-created
    protected $fillable = ['name', 'speciality'];

    /**
     * Get all of the doctor's bookings.
     */
    public function bookings(): MorphMany
    {
        return $this->morphMany(Booking::class, 'bookable');
    }
}
