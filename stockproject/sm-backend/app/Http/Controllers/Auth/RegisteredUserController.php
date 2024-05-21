<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisteredUserController extends Controller
{
    public function register(Request $request)
    {
        // Create a new user instance

        // Create a new user instance
        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->phone_number = $request->phone_number;

        // Assign default image path to user's profile picture

        // Save the user
        $result = $user->save();

        if ($result) {
            return "Sign up successful";
        } else {
            return "Sign up failed";
        }

    }
}
