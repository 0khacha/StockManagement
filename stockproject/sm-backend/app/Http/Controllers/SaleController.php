<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use App\Models\Stock;

class SaleController extends Controller
{

    public function index()
    {
        $sales = Sale::all();
        return response()->json(['sales' => $sales], 200);
    }
    public function store(Request $request)
    {
        $sale = new Sale();
        $sale->article = $request->input('article');
        $sale->description = $request->input('description');
        $sale->client = $request->input('client');
        $sale->quantity = $request->input('quantity');
        $sale->unit_price = $request->input('unit_price');
        $sale->category = $request->input('category');



        $sale->save();

        return response()->json(['message' => 'Sale created successfully', 'sale' => $sale], 201);
    }
    public function update(Request $request, $id)
    {
        $sale = Sale::findOrFail($id);

        $sale->article = $request->input('article');
        $sale->description = $request->input('description');
        $sale->client = $request->input('client');
        $sale->quantity = $request->input('quantity');
        $sale->unit_price = $request->input('unit_price');
        $sale->category = $request->input('category');
        $sale->save();
        return response()->json(['success' => 'Client updated successfully', 'client' => $sale]);
    }


    public function destroy($id)
    {
        $sale = Sale::findOrFail($id);

        // Update stock quantity


        $sale->delete();

        return response()->json(['message' => 'Sale deleted successfully'], 200);
    }

}
