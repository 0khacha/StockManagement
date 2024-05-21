<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }


    public function updatePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
            'new_password' => 'required|string|confirmed',
            'new_password_confirmation' => 'required|string',
        ]);

        $user = Auth::user();
        $currentPassword = $request->password;
        $newPassword = $request->new_password;

        // Verify current password
        if (Hash::check($currentPassword, $user->password)) {
            // Hash and update the new password
            $user->password = Hash::make($newPassword);
            $user->save();

            return response()->json(['message' => 'Password updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }
    }




}
