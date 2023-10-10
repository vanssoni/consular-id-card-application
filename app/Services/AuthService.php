<?php

namespace App\Services;

class AuthService
{
   public function login($email, $password) :array
   {
        if( \Auth::attempt(['email' => $email, 'password' => $password]) ){
            // \Auth::user()->tokens()->delete();
            \Auth::user()->setAttribute("token", \Auth::user()->createToken('ApiToken')->plainTextToken);

            return [
                'success' => true,
                'user' => \Auth::user(),
            ];
        }

        return [
            'success' => false,
            'errors' => [
                'email' => [
                    'Please check your credentials'
                ]
            ] ,
        ];
   }
}
