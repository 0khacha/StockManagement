<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->get();
        return response()->json(['orders' => $orders], 200);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $order = new Order();
        $order->article = $request->input('article');
        $order->supplier = $request->input('supplier');
        $order->category = $request->input('category');
        $order->quantity = $request->input('quantity');
        $order->unit_price = $request->input('unit_price');
        $order->description = $request->input('description');
        $order->user_id = $user->id;
        $order->save();

        return response()->json(['success' => 'Order created successfully', 'order' => $order], 201);
    }

    public function show($id)
    {
        $user = Auth::user();
        $order = Order::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        return response()->json(['order' => $order], 200);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $order = Order::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $order->article = $request->input('article');
        $order->supplier = $request->input('supplier');
        $order->category = $request->input('category');
        $order->quantity = $request->input('quantity');
        $order->unit_price = $request->input('unit_price');
        $order->description = $request->input('description');
        $order->save();

        return response()->json(['success' => 'Order updated successfully', 'order' => $order]);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $order = Order::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $order->delete();
        return response()->json(['success' => 'Order deleted successfully']);
    }
}
