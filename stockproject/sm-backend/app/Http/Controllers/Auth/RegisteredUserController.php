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
        $user->phone = $request->phone;

        // Assign default image path to user's profile picture
        $user->image = 'https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'; // Replace with your default image path

        // Save the user
        $result = $user->save();

        if ($result) {
            return "Sign up successful";
        } else {
            return "Sign up failed";
        }

    }
}
