<?php
namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    // Display a listing of the clients
    public function index()
    {
        $user = Auth::user();
        $clients = Client::where('user_id', $user->id)->get();
        return response()->json($clients);
    }

    // Store a newly created client in storage
    public function store(Request $request)
    {
        $user = Auth::user();

        $client = new Client();
        $client->first_name = $request->input('first_name');
        $client->last_name = $request->input('last_name');
        $client->email = $request->input('email');
        $client->phone_number = $request->input('phone_number');
        $client->address = $request->input('address');
        $client->user_id = $user->id;
        $client->save();

        return response()->json(['success' => 'Client created successfully', 'client' => $client], 201);
    }

    // Display the specified client
    public function show($id)
    {
        $user = Auth::user();
        $client = Client::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        return response()->json($client);
    }

    // Update the specified client in storage
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $client = Client::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        $client->first_name = $request->input('first_name');
        $client->last_name = $request->input('last_name');
        $client->email = $request->input('email');
        $client->phone_number = $request->input('phone_number');
        $client->address = $request->input('address');
        $client->save();

        return response()->json(['success' => 'Client updated successfully', 'client' => $client]);
    }

    // Remove the specified client from storage
    public function destroy($id)
    {
        $user = Auth::user();
        $client = Client::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $client->delete();
        return response()->json(['success' => 'Client deleted successfully']);
    }
}
