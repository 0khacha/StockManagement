<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\clientController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
//// routes/web.php
Route::post('/signup', 'Auth\RegisteredUserController@store');




