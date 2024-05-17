<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            // Here you can use the $user variable to select or update data
            // For example, if you want to update a field in the user's profile
            // You can do something like this:
            // $user->profile()->update(['field_name' => 'new_value']);

            // Example of selecting data related to the user
            // $data = SomeModel::where('user_id', $user->id)->get();

            // Return the user's information
            return response()->json([
                'firstName' => $user->first_name,
                'lastName' => $user->last_name,
                // Add additional data as needed
            ]);
        }

        // If user is not authenticated, return error response
        return response()->json(['error' => 'Unauthenticated'], 401);
    }
}
