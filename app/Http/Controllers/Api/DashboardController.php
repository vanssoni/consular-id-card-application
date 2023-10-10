<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DashboardService;
class DashboardController extends Controller
{

    public function getData(Request $request, DashboardService $dashboardService ){
        return response()->json($dashboardService->getData($request));
    }
}
