<?php


use App\Http\Controllers\ArticleController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\clientController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//  return $request->user();
//});


//Route::get('/user', [UserController::class, 'getUserInfo']);

//use App\Http\Controllers\Auth\LoginController;
//use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

Route::post('/login', [LoginController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [LoginController::class, 'user']);
Route::middleware('auth:sanctum')->put('/updateUser', [LoginController::class, 'updateUser']);
Route::middleware('auth:sanctum')->put('/updatePassword', [UserController::class, 'updatePassword']);




Route::post('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'register']);
// routes/api.php

// routes/api.php

//
//Route::post('/login', [LoginController::class, 'login']);
//Route::post('/logout', [LoginController::class, 'logout']);
//




//Client API
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/clients', [ClientController::class, 'index']);
    Route::post('/clients', [ClientController::class, 'store']);
    Route::put('/clients/{id}', [ClientController::class, 'update']);
    Route::delete('/clients/{id}', [ClientController::class, 'destroy']);
});

//Supplier API
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/supplier', [SupplierController::class, 'index']); // GET request
    Route::get('/supplier/create', [SupplierController::class, 'create']); // GET request
    Route::post('/supplier', [SupplierController::class, 'store']); // POST request
    Route::get('/supplier/{id}', [SupplierController::class, 'show']); // GET request with {id} parameter
    Route::get('/supplier/{id}/edit', [SupplierController::class, 'edit']); // GET request with {id} parameter
    Route::put('/supplier/{id}', [SupplierController::class, 'update']); // PUT request with {id} parameter
    Route::delete('/supplier/{id}', [SupplierController::class, 'destroy']); // DELETE request with {id} parameter
});


//Article api

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/articles', [ArticleController::class, 'index']); // GET request - Get all articles
    Route::post('/articles', [ArticleController::class, 'store']); // POST request - Create a new article
//    Route::get('/articles/{id}', [ArticleController::class, 'show']); // GET request - Get a specific article by ID
    Route::put('/articles/{id}', [ArticleController::class, 'update']); // PUT request - Update an article by ID
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']); // DELETE request - Delete an article by ID
});


//order api
Route::middleware('auth:sanctum')->group(function () {
    Route::get('orders', [OrderController::class, 'index']);
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::put('orders/{id}', [OrderController::class, 'update']);
    Route::delete('orders/{id}', [OrderController::class, 'destroy']);
});



//sales api
Route::get('/sales', [SaleController::class, 'index'])->name('article.index'); // GET request
Route::get('/sales/create', [SaleController::class, 'create'])->name('article.create'); // GET request
Route::post('/sales', [SaleController::class, 'store'])->name('article.store'); // POST request
Route::get('/sales/{id}', [SaleController::class, 'show'])->name('article.show'); // GET request with {id} parameter
Route::get('/sales/{id}/edit', [SaleController::class, 'edit'])->name('article.edit'); // GET request with {id} parameter
Route::put('/sales/{id}', [SaleController::class, 'update'])->name('article.update'); // PUT request with {id} parameter
Route::delete('/sales/{id}', [SaleController::class, 'destroy'])->name('article.destroy'); // DELETE request with {id} parameter

//stock api
Route::get('/stock', [\App\Http\Controllers\StockController::class, 'index'])->name('article.index'); // GET request


