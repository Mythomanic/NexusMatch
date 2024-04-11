<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::post('/auth/register', [UserController::class, 'create'])->name('register');
Route::post('/auth/login', [UserController::class, 'login'])->name('login');

Route::get('/user/{id}', [UserController::class,'show'])->name('get.user');
Route::get('/user', [UserController::class,'showAll'])->name('getAll.user');
Route::post('/user/edit/{id}', [UserController::class,'edit'])->name('edit.user');
Route::delete('/user/delete/{id}', [UserController::class,'destroy'])->name('delete.user');

