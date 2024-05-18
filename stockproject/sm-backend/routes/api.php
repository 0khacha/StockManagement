<?php


use App\Http\Controllers\ArticleController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\clientController;
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
Route::middleware('auth:sanctum')->put('/user', [LoginController::class, 'updateUser']);





Route::post('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'register']);
// routes/api.php

// routes/api.php

//
//Route::post('/login', [LoginController::class, 'login']);
//Route::post('/logout', [LoginController::class, 'logout']);
//




//Client API
Route::get('/clients', [clientController::class, 'index'])->name('clients.index'); // GET request
Route::get('/clients/create', [clientController::class, 'create'])->name('clients.create'); // GET request
Route::post('/clients', [clientController::class, 'store'])->name('clients.store'); // POST request
Route::get('/clients/{id}', [clientController::class, 'show'])->name('clients.show'); // GET request with {id} parameter
Route::get('/clients/{id}/edit', [clientController::class, 'edit'])->name('clients.edit'); // GET request with {id} parameter
Route::put('/clients/{id}', [clientController::class, 'update'])->name('clients.update'); // PUT request with {id} parameter
Route::delete('/clients/{id}', [clientController::class, 'destroy'])->name('clients.destroy'); // DELETE request with {id} parameter

//Supplier API
Route::get('/supplier', [SupplierController::class, 'index'])->name('supplier.index'); // GET request
Route::get('/supplier/create', [SupplierController::class, 'create'])->name('supplier.create'); // GET request
Route::post('/supplier', [SupplierController::class, 'store'])->name('supplier.store'); // POST request
Route::get('/supplier/{id}', [SupplierController::class, 'show'])->name('supplier.show'); // GET request with {id} parameter
Route::get('/supplier/{id}/edit', [SupplierController::class, 'edit'])->name('supplier.edit'); // GET request with {id} parameter
Route::put('/supplier/{id}', [SupplierController::class, 'update'])->name('supplier.update'); // PUT request with {id} parameter
Route::delete('/supplier/{id}', [SupplierController::class, 'destroy'])->name('supplier.destroy'); // DELETE request with {id} parameter

//Article api

Route::get('/article', [ArticleController::class, 'index'])->name('article.index'); // GET request
Route::get('/article/create', [ArticleController::class, 'create'])->name('article.create'); // GET request
Route::post('/article', [ArticleController::class, 'store'])->name('article.store'); // POST request
Route::get('/article/{id}', [ArticleController::class, 'show'])->name('article.show'); // GET request with {id} parameter
Route::get('/article/{id}/edit', [ArticleController::class, 'edit'])->name('article.edit'); // GET request with {id} parameter
Route::put('/article/{id}', [ArticleController::class, 'update'])->name('article.update'); // PUT request with {id} parameter
Route::delete('/article/{id}', [ArticleController::class, 'destroy'])->name('article.destroy'); // DELETE request with {id} parameter





