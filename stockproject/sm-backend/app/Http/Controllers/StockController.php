<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;

class StockController extends Controller
{
    // Get all stock items
    public function index()
    {
        $stock = Stock::all();
        return response()->json($stock);
    }

    // Get a specific stock item by ID
    public function show($id)
    {
        $stock = Stock::findOrFail($id);
        return response()->json($stock);
    }

    // Add a new stock item
    public function store(Request $request)
    {
        $stock = new Stock();
        $stock->article_id = $request->input('article_id');
        $stock->quantity = $request->input('quantity');
        // Add more fields as needed
        $stock->save();
        return response()->json(['success' => 'Stock item created successfully', 'stock' => $stock], 201);
    }

    // Update an existing stock item
    public function update(Request $request, $id)
    {
        $stock = Stock::findOrFail($id);
        $stock->article_id = $request->input('article_id');
        $stock->quantity = $request->input('quantity');
        // Update more fields as needed
        $stock->save();
        return response()->json(['success' => 'Stock item updated successfully', 'stock' => $stock]);
    }

    // Delete a stock item
    public function destroy($id)
    {
        $stock = Stock::findOrFail($id);
        $stock->delete();
        return response()->json(['success' => 'Stock item deleted successfully']);
    }
}
