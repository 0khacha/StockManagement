<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client; // Assuming you have a Client model

class clientController extends Controller
{
    // Display a listing of the clients
    public function index()
    {
        $clients = Client::all();
        return response()->json($clients);
    }

    // Store a newly created client in storage
    public function store(Request $request)
    {
        // Create a new client instance
        $client = new Client();
        $client->first_name = $request->input('first_name');
        $client->last_name = $request->input('last_name');
        $client->email = $request->input('email');
        $client->phone_number = $request->input('phone_number');
        $client->address = $request->input('address');
        $client->save();

        return response()->json(['success' => 'Client created successfully', 'client' => $client], 201);
    }




    // Display the specified client
    public function show($id)
    {
        $client = Client::findOrFail($id);
        return response()->json($client);
    }

    // Update the specified client in storage
    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);

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
        $client = Client::findOrFail($id);
        $client->delete();
        return response()->json(['success' => 'Client deleted successfully']);
    }
}
