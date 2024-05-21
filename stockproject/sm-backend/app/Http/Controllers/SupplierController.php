<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SupplierController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $suppliers = Supplier::where('user_id', $user->id)->get();
        return response()->json($suppliers);
    }

    // Store a newly created supplier in storage
    public function store(Request $request)
    {
        $user = Auth::user();

        $supplier = new Supplier();
        $supplier->first_name = $request->input('first_name');
        $supplier->last_name = $request->input('last_name');
        $supplier->email = $request->input('email');
        $supplier->phone_number = $request->input('phone_number');
        $supplier->address = $request->input('address');
        $supplier->user_id = $user->id;
        $supplier->save();

        return response()->json(['success' => 'Supplier created successfully', 'supplier' => $supplier], 201);
    }

    // Display the specified supplier
    public function show($id)
    {
        $user = Auth::user();
        $supplier = Supplier::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        return response()->json($supplier);
    }

    // Update the specified supplier in storage
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $supplier = Supplier::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        $supplier->first_name = $request->input('first_name');
        $supplier->last_name = $request->input('last_name');
        $supplier->email = $request->input('email');
        $supplier->phone_number = $request->input('phone_number');
        $supplier->address = $request->input('address');
        $supplier->save();

        return response()->json(['success' => 'Supplier updated successfully', 'supplier' => $supplier]);
    }

    // Remove the specified supplier from storage
    public function destroy($id)
    {
        $user = Auth::user();
        $supplier = Supplier::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $supplier->delete();
        return response()->json(['success' => 'Supplier deleted successfully']);
    }
}