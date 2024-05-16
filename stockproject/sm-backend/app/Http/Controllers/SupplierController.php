<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index()
    {
        $suppliers = Supplier::all();
        return response()->json($suppliers);
    }

    // Store a newly created client in storage
    public function store(Request $request)
    {
        // Create a new client instance
        $supplier = new Supplier();
        $supplier->first_name = $request->input('first_name');
        $supplier->last_name = $request->input('last_name');
        $supplier->email = $request->input('email');
        $supplier->phone_number = $request->input('phone_number');
        $supplier->address = $request->input('address');
        $supplier->save();

        return response()->json(['success' => 'Supplier created successfully', 'supplier' => $supplier], 201);
    }




    // Display the specified client
    public function show($id)
    {
        $supplier = Supplier::findOrFail($id);
        return response()->json($supplier);
    }

    // Update the specified client in storage
    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);

        $supplier->first_name = $request->input('first_name');
        $supplier->last_name = $request->input('last_name');
        $supplier->email = $request->input('email');
        $supplier->phone_number = $request->input('phone_number');
        $supplier->address = $request->input('address');
        $supplier->save();

        return response()->json(['success' => 'supplier updated successfully', 'supplier' => $supplier]);
    }

    // Remove the specified client from storage
    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);
        $supplier->delete();
        return response()->json(['success' => 'Supplier deleted successfully']);
    }
}
