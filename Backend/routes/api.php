<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ChatController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/auth/register', [UserController::class, 'create'])->name('register');
Route::post('/auth/login', [UserController::class, 'login'])->name('login');

Route::post('messages', [ChatController::class, 'message']);

Route::get('/user/{id}', [UserController::class,'show'])->name('get.user');
Route::get('/user', [UserController::class,'showAll'])->name('getAll.user');
Route::post('/user/edit/{id}', [UserController::class,'edit'])->name('edit.user');
Route::delete('/user/delete/{id}', [UserController::class,'destroy'])->name('delete.user');
