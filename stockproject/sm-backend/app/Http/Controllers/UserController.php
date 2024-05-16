<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get the authenticated user's information.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserInfo(Request $request)
    {
        // Retrieve the authenticated user
        $user = $request->user();

        if ($user) {
            // Return the user's first name and last name
            return response()->json([
                'firstName' => $user->first_name,
                'lastName' => $user->last_name,
            ]);
        }

        // If user is not authenticated, return error response
        return response()->json(['error' => 'Unauthenticated'], 401);
    }
}
