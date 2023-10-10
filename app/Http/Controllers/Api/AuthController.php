<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
class AuthController extends Controller
{
    public function login(LoginRequest $request, AuthService $authService)
    {
        //attempt the login
        $response = $authService->login($request->email, $request->password);
        return response()->json($response);
    }
}
