<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Supplier;
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
        // Create a new client instance
        $order = new Order();
        $order->id_article = $request->input('first_name');
        $order->last_name = $request->input('last_name');
        $order->email = $request->input('email');
        $order->phone_number = $request->input('phone_number');
        $order->address = $request->input('address');
        $order->save();

        return response()->json(['success' => 'Order created successfully', 'Order' => $order], 201);
    }
}
