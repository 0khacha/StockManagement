<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $order = new Order();
        $order->article = $request->input('article');
        $order->supplier = $request->input('supplier');
        $order->category = $request->input('category');
        $order->quantity = $request->input('quantity');
        $order->unit_price = $request->input('unit_price');
        $order->description = $request->input('description');
        $order->created_at = now();
        $order->updated_at = now();
        $order->save();

        return response()->json(['success' => 'Order created successfully', 'order' => $order], 201);
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);
        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->article = $request->input('article');
        $order->supplier = $request->input('supplier');
        $order->category = $request->input('category');
        $order->quantity = $request->input('quantity');
        $order->unit_price = $request->input('unit_price');
        $order->description = $request->input('description');
        $order->updated_at = now();
        $order->save();

        return response()->json(['success' => 'Order updated successfully', 'order' => $order]);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(['success' => 'Order deleted successfully']);
    }
}
