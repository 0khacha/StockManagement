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




Route::get('/health-check', function () {
    return response()->json(['status' => 'OK'], 200);
});



use App\Http\Controllers\AuthController;

Route::post('/login', [LoginController::class, 'login']);
Route::post('/check-email', [LoginController::class, 'checkEmail']);
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [LoginController::class, 'user']);
Route::middleware('auth:sanctum')->put('/updateUser', [LoginController::class, 'updateUser']);
Route::middleware('auth:sanctum')->put('/updatePassword', [UserController::class, 'updatePassword']);
Route::middleware('auth:sanctum')->delete('/delete-account', [LoginController::class, 'deleteAccount']);



Route::post('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'register']);




//Client API
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/clients', [ClientController::class, 'index']);
    Route::post('/clients', [ClientController::class, 'store']);
    Route::put('/clients/{id}', [ClientController::class, 'update']);
    Route::delete('/clients/{id}', [ClientController::class, 'destroy']);
});

//Supplier API
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/supplier', [SupplierController::class, 'index'])->name('supplier.index'); // GET request
    Route::get('/supplier/create', [SupplierController::class, 'create'])->name('supplier.create'); // GET request
    Route::post('/supplier', [SupplierController::class, 'store'])->name('supplier.store'); // POST request
    Route::get('/supplier/{id}', [SupplierController::class, 'show'])->name('supplier.show'); // GET request with {id} parameter
    Route::get('/supplier/{id}/edit', [SupplierController::class, 'edit'])->name('supplier.edit'); // GET request with {id} parameter
    Route::put('/supplier/{id}', [SupplierController::class, 'update'])->name('supplier.update'); // PUT request with {id} parameter
    Route::delete('/supplier/{id}', [SupplierController::class, 'destroy'])->name('supplier.destroy'); // DELETE request with {id} parameter
});
//Article api
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/article', [ArticleController::class, 'index'])->name('article.index'); // GET request
    Route::get('/article/create', [ArticleController::class, 'create'])->name('article.create'); // GET request
    Route::post('/article', [ArticleController::class, 'store'])->name('article.store'); // POST request
    Route::get('/article/{id}', [ArticleController::class, 'show'])->name('article.show'); // GET request with {id} parameter
    Route::get('/article/{id}/edit', [ArticleController::class, 'edit'])->name('article.edit'); // GET request with {id} parameter
    Route::put('/article/{id}', [ArticleController::class, 'update'])->name('article.update'); // PUT request with {id} parameter
    Route::delete('/article/{id}', [ArticleController::class, 'destroy'])->name('article.destroy'); // DELETE request with {id} parameter
});

//order api
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('article.index'); // GET request
    Route::get('/orders/create', [OrderController::class, 'create'])->name('article.create'); // GET request
    Route::post('/orders', [OrderController::class, 'store'])->name('article.store'); // POST request
    Route::get('/orders/{id}', [OrderController::class, 'show'])->name('article.show'); // GET request with {id} parameter
    Route::get('/orders/{id}/edit', [OrderController::class, 'edit'])->name('article.edit'); // GET request with {id} parameter
    Route::put('/orders/{id}', [OrderController::class, 'update'])->name('article.update'); // PUT request with {id} parameter
    Route::delete('/orders/{id}', [OrderController::class, 'destroy'])->name('article.destroy'); // DELETE request with {id} parameter
});
//sales api
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/sales', [SaleController::class, 'index'])->name('article.index'); // GET request
    Route::get('/sales/create', [SaleController::class, 'create'])->name('article.create'); // GET request
    Route::post('/sales', [SaleController::class, 'store'])->name('article.store'); // POST request
    Route::get('/sales/{id}', [SaleController::class, 'show'])->name('article.show'); // GET request with {id} parameter
    Route::get('/sales/{id}/edit', [SaleController::class, 'edit'])->name('article.edit'); // GET request with {id} parameter
    Route::put('/sales/{id}', [SaleController::class, 'update'])->name('article.update'); // PUT request with {id} parameter
    Route::delete('/sales/{id}', [SaleController::class, 'destroy'])->name('article.destroy'); // DELETE request with {id} parameter

});

//stock api
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/stock', [\App\Http\Controllers\StockController::class, 'index'])->name('article.index'); // GET request
});
