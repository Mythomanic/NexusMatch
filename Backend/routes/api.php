<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\SwipeController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\JobFilterController;


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

Route::get('/userjob/{id}', [UserController::class,'show'])->name('get.user');
Route::get('/user', [UserController::class,'showAll'])->name('getAll.user');
Route::post('/user/edit/{id}', [UserController::class,'edit'])->name('edit.user');
Route::delete('/user/delete/{id}', [UserController::class,'destroy'])->name('delete.user');



// auth içindeki kullanımlar için:
/* 
Headers:
Content-Type: application/json
Authorization: Bearer 3|IRR8fj3433Bs9yO5OCg7vKdhlypNiDksKOUJaEXlfd4df127 
3|IRR8fj3433Bs9yO5OCg7vKdhlypNiDksKOUJaEXlfd4df127 örnek token burdaki token localstoragedan çekilecek

Body (JSON):
    {
    "örnek": "örnek özellik",
    "örnek2": "örnek özellik2",
    }

GET, DELETE methodlularda body'ye ve "Content-Type: application/json"'a gerek yok

örnek endpoint kullanımı: 
Method: POST
https://nexusmain.onrender.com/api/jobs -> yeni job ekler
Method: GET
https://nexusmain.onrender.com/api/jobs -> Bütün job'ları çeker
Method: GET
https://nexusmain.onrender.com/api/jobs/1 -> id'si 1 olan job'u çeker
Method PUT
https://nexusmain.onrender.com/api/jobs/1 -> id'si 1 olan job'u değiştirir
Method DELETE
https://nexusmain.onrender.com/api/jobs/1 -> id'si 1 olan job'u siler

https://nexusmain.onrender.com/storage/avatars/resminismi.png -> resmi çekmek için url

https://nexusmain.onrender.com/api/user/{userid}/jobs/{jobId}/swipe

body
{
            "direction" : "dislike"
}

job'u like'layanları çekmek için
https://nexusmain.onrender.com/api/job/jobid/likes 

user'ın oluşturduğu jobları çekmek için
https://nexusmain.onrender.com/api/user/userid/jobs 

*/
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('jobs', JobController::class);
    Route::apiResource('swipes', SwipeController::class);
    Route::apiResource('matches', MatchController::class);
    Route::apiResource('filters', JobFilterController::class);
    Route::put('/user/{user}/update-profile', [UserController::class, 'updateUserProfile']);
    Route::get('/user/{user}/tags', [UserController::class, 'getTags']);
    Route::get('/user/{user}/job-profile', [UserController::class, 'getJobProfile']);
    Route::post('/user/logout', [UserController::class, 'logout']);
    Route::post('/user/{user}/update-avatar', [UserController::class, 'updateAvatar']);
    Route::post('/user/{user}/update-avatar-job', [UserController::class, 'updateAvatarJob']);
    Route::post('/user/{user}/jobs/{jobId}/swipe', [UserController::class, 'swipe']);
    Route::get('/job/{job}/likes', [JobController::class, 'getLikedUsers']);
    Route::get('/user/{id}/jobs', [UserController::class, 'getUserJobs']);
});




