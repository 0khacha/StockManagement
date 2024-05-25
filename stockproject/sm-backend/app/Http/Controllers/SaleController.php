<?php
namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Sale;
use Illuminate\Http\Request;
use App\Models\Stock;
use Illuminate\Support\Facades\Auth;

class SaleController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $sales = Sale::where('user_id', $user->id)->get();
        return response()->json(['sales' => $sales], 200);
    }

    public function store(Request $request)
    {

        $user = Auth::user();

        // Validation
        $request->validate([
            'article' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'client' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
        ]);

        $sale = new Sale();
        $sale->article = $request->input('article');
        $sale->description = $request->input('description');
        $sale->client = $request->input('client');
        $sale->quantity = $request->input('quantity');
        $sale->unit_price = $request->input('unit_price');
        $sale->category = $request->input('category');
        $sale->user_id = $user->id;

        $sale->save();

        return response()->json(['message' => 'Sale created successfully', 'sale' => $sale], 201);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        // Validation
        $request->validate([
            'article' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'client' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
        ]);

        $sale = Sale::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        $sale->article = $request->input('article');
        $sale->description = $request->input('description');
        $sale->client = $request->input('client');
        $sale->quantity = $request->input('quantity');
        $sale->unit_price = $request->input('unit_price');
        $sale->category = $request->input('category');
        $sale->save();

        return response()->json(['success' => 'Sale updated successfully', 'sale' => $sale]);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $sale = Sale::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $sale->delete();

        return response()->json(['message' => 'Sale deleted successfully'], 200);
    }

}
