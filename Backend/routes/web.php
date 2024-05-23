<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PusherController;
use App\Http\Controllers\Api\UserController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::view('/', 'usercontrol')->name("chatPage");
Route::get('/chat', [PusherController::class, "index"])->name("chatPage");
Route::post('/broadcast', [PusherController::class, 'broadcast']);
Route::post('/receive', [PusherController::class ,'receive']);
Route::get('/profile', [UserController::class, 'showUser'])->name('profile.show');
Route::put('/profile', [UserController::class, 'updateAvatar'])->name('profile.update');
