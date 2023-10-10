<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', '\App\Http\Controllers\Api\AuthController@login');

Route::group(['middleware' => 'auth:sanctum'], function () {
    //get the user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    //get counters for dashboard
    Route::get('/dashboard-data',  '\App\Http\Controllers\Api\DashboardController@getData');
    //participant related route
    Route::apiResource('/participants',  \App\Http\Controllers\Api\ParticipantController::class);
});
