<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'token' => $token,
            ], 200);
        } else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user) {
            // Revoke all tokens for the user (more secure)
            $user->tokens()->delete();
            Log::info('User logged out.', ['user' => $user]);
            return response()->json(['message' => 'Logout successful'], 200);
        } else {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    }

    public function user(Request $request)
    {
        Log::info('User request received.', ['user' => $request->user()]);
        return response()->json($request->user());
    }

    public function updateUser(Request $request)
    {
        $user = Auth::user();

        // Validate the input fields
        $validator = Validator::make($request->all(), [
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'phone_number' => 'string|max:20',
            'image' => 'nullable|string', // Assuming the image field will contain the path to the image
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update other user information
        $user->update($request->all());

        // Save the user data
        $user->save();

        return response()->json(['message' => 'User data updated successfully', 'user' => $user], 200);
    }




}
