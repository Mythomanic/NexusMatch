<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\DateController;
use App\Http\Controllers\Api\SwipeController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\JobFilterController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Auth;


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



filtreleme için
http://nexusmain.onrender.com/api/user/userid/jobs/filterJob
body:
{
    "position" : "herhangi bir pozisyon"
}

*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/broadcasting/auth', function (Request $request) {
        return Broadcast::auth($request);
        });
        
        Route::post('/user/logout', [UserController::class, 'logout']);
        Route::put('/user/{user}/update-profile', [UserController::class, 'updateUserProfile']);
        Route::get('/user/{user}/tags', [UserController::class, 'getTags']);
        Route::post('/user/{user}/update-avatar', [UserController::class, 'updateAvatar']);

        Route::get('/user/{user}/job-profile', [UserController::class, 'getJobProfile']);
        Route::post('/user/{user}/update-avatar-job', [UserController::class, 'updateAvatarJob']);
        Route::post('/user/{user}/jobs/{jobId}/swipe', [UserController::class, 'swipe']);
        Route::get('/user/{id}/jobs', [UserController::class, 'getUserJobs']);
        Route::get('/user/{userId}/jobOpportunities', [UserController::class, 'getUnseenJobs']);
        
        Route::get('/user/{user}/event-profile', [UserController::class, 'getEventProfile']);
        Route::post('/user/{user}/update-avatar-event', [UserController::class, 'updateAvatarEvent']);
        Route::post('/user/{user}/events/{eventId}/swipeEvent', [UserController::class, 'swipeEvent']);
        Route::get('/user/{id}/events', [UserController::class, 'getUserEvents']);
        Route::get('/user/{userId}/eventOpportunities', [UserController::class, 'getUnseenEvents']);

        Route::get('/user/{user}/date-profile', [UserController::class, 'getDateProfile']);
        Route::post('/user/{user}/update-avatar-date', [UserController::class, 'updateAvatarDate']);
        Route::post('/user/{user}/dates/{dateId}/swipeDate', [UserController::class, 'swipeDate']);
        Route::get('/user/{id}/dates', [UserController::class, 'getUserDates']);
        Route::get('/user/{userId}/dateOpportunities', [UserController::class, 'getUnseenDates']);
        
        
        
        Route::get('/chats/{chat}/messages', [MessageController::class, 'fetchMessages']);
        Route::post('/chats/{chat}/messages', [MessageController::class, 'sendMessage']);

        Route::post('/chats', [ChatController::class, 'createChat']);
        Route::get('/chats', [ChatController::class, 'fetchChats']);
        
        Route::apiResource('jobs', JobController::class);
        Route::get('/job/{job}/likes', [JobController::class, 'getLikedUsers']);
        Route::post('/jobs/{jobId}/move-user/{userId}', [JobController::class, 'moveUserFromLikesToDislikes']);
        Route::get('/user/{userId}/jobs/filterJob', [JobController::class, 'filterByPosition']);
        
        Route::apiResource('events', EventController::class);
        Route::get('/event/{event}/likes', [EventController::class, 'getLikedUsers']);
        Route::post('/events/{eventId}/move-user/{userId}', [EventController::class, 'moveUserFromLikesToDislikes']);
        Route::get('/user/{userId}/events/filterEvent', [EventController::class, 'filterByTitle']);

        Route::apiResource('dates', DateController::class);
        Route::get('/date/{date}/likes', [DateController::class, 'getLikedUsers']);
        Route::post('/dates/{dateId}/move-user/{userId}', [DateController::class, 'moveUserFromLikesToDislikes']);
        Route::get('/user/{userId}/dates/filterDate', [DateController::class, 'filterByOwnGender']);
        
        });








