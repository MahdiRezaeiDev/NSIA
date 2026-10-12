<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware(['throttle:1000,1'])->group(function(){
    Route::get('/', function () {
        if(!\Auth::user()){
            return redirect("/login");
        }elseif(\Auth::user()->isAdmin()){
            return redirect("/home");
        }else{
            return redirect("/userDashboard");
        }
       
    });
});



Auth::routes();
Route::middleware(['auth','UserAccess:allUsers','LogRequest'])->group(function(){
    Route::any('/getIndividualApplications', 'MainController@getIndividualApplications');
    Route::get('/viewIndividualApplication', 'MainController@viewIndividualApplication');
    Route::get('/moveApplicationToNextStep', 'MainController@moveApplicationToNextStep');
    Route::get("/logout","UsersController@logout");
    Route::get("/userDashboard","UsersController@userDashboard");
    Route::get("/changePasswordForm","UsersController@viewChangePassword");
    Route::post("/changePassword","UsersController@changePassword");
    Route::get("/individual-applications","MainController@individualApplications");
    Route::get("/applicationViewClosed","MainController@applicationViewClosed");
    Route::post("/saveNote","MainController@saveNote");
    Route::get("/getNotes","MainController@getNotes");
    

});

Route::middleware(['auth','UserAccess:admin'])->group(function(){
    Route::get('/home', 'HomeController@index')->name('home');

});



/** Administrator Routes **/

Route::prefix('/admin')->middleware(['auth','UserAccess:admin','LogRequest'])->group(function(){
    Route::get("/users","UsersController@index")->name('users');
    Route::get("/getUsers","UsersController@getUsers");
    Route::get("/newUser","UsersController@newUser");
    Route::post("/saveUser","UsersController@saveUser");

    Route::get("/centers","UsersController@centers")->name('centers');
    Route::get("/newCenter","UsersController@newCenter");
    Route::post("/saveCenter","UsersController@saveCenter");
    Route::get("/getRoles","UsersController@getRoles");
    Route::get("/getCenters","UsersController@getCenters");
    Route::get("/template/{id?}","AppointmentsController@template");
    Route::get("/getTemplates","AppointmentsController@getTemplates");
    Route::get("/templates","AppointmentsController@templates");
    Route::get("/deleteTemplate","AppointmentsController@deleteTemplate");
    Route::post("/saveTemplate","AppointmentsController@saveTemplate");
    Route::get("/applicationViewClosed","MainController@applicationViewClosed");
});
Route::prefix("/staff")->middleware(['auth','LogRequest'])->group(function(){
    Route::any("/findApplication","FormController@findApplication");
});
Route::group(['middleware' => 'throttle:200000,1','LogRequest'], function () {
    Route::get("/searchApplication",'FormController@searchApplication');
    Route::get("/print-individual-form","FormController@printIndividualForm");
});
Route::get('/viewImage', 'MainController@viewImage')->middleware('auth');

// Route::get("test", function (){
//     return view('public-views.')
// });
