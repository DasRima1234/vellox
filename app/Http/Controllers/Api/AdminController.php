<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MaintenanceService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    protected $maintenance;

    public function __construct(MaintenanceService $maintenance)
    {
        $this->maintenance = $maintenance;
    }

    public function deduplicateDoctors(Request $request)
    {
        $request->validate([
            'name' => 'required|string|exists:doctors,name'
        ]);

        $result = $this->maintenance->mergeDuplicates($request->name);

        return response()->json($result);
    }
}