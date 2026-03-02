<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Booking extends Model
{
    protected $fillable = ['user_id', 'start_time', 'end_time', 'status'];

    public function bookable(): MorphTo
    {
        return $this->morphTo();
    }
}
