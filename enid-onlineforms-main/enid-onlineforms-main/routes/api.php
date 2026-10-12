<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['middleware' => ['auth:api','active.api','throttle:12000,1','LogRequest']],function(){
    Route::any('/isLoggedIn','MobileAppController@isLoggedIn');
    Route::any('/getIndividualApplications', 'MainController@getIndividualApplications');
    Route::any('/getApplications', 'MobileAppController@getApplications');
    Route::any('/getStatusList', 'MobileAppController@getStatusList');
    Route::get("/getFamilyApplication",'MobileAppController@getFamilyApplication');
    Route::post("/changePassword","MobileAppController@changePassword");
    Route::get("/viewImage","MainController@viewImage");
    Route::get("/appointmentDates","AppointmentsController@getDates");
    Route::get("/getCenters","MobileAppController@getCenters");
    Route::get("/individualapplication-details",'MobileAppController@getIndividualApplicationDetails');

    Route::post("/saveNote","MainController@saveNote");
    Route::get("/getNotes","MainController@getNotes");
    Route::get('/moveApplicationToNextStep', 'MobileAppController@moveApplicationToNextStep');
   
    Route::get('/moveFamilyForm', 'MobileAppController@moveFamilyForm');
    Route::get('/resetApplication', 'MobileAppController@resetApplication');
    
    Route::get("/applicationOpened","MobileAppController@applicationOpened");
    Route::get("/applicationClosed","MobileAppController@applicationClosed");
    Route::get("/getDashboard","MobileAppController@getDashboard");
    Route::get("/getAttachments","MobileAppController@getAttachments");
    Route::get("/updateVerificationReference","MobileAppController@updateVerificationReference");
    Route::get("/moveToVipCenter","MobileAppController@moveToVipCenter");
    Route::post("/updateStatus","MobileAppController@handleVerificationHook");
    Route::get("/checkApplication","MobileAppController@isValidApplication");
    Route::get("/downloadFile","MobileAppController@downloadFile");
    Route::get("/downloadReport","ReportsController@downloadGeneralReport");
    Route::get("/downloadActivityReport","ReportsController@downloadActivityReport");
    Route::get("/getAuditReport","ReportsController@getAuditReport");
    Route::get("/getTransferReport","ReportsController@getTransferReport");

    Route::get("/downloadFamilyReport","ReportsController@downloadFamilyReport");
    Route::get("/downloadCurrentReport","ReportsController@downloadCurrentReport");
    Route::get("/getGeneralReport","ReportsController@getGeneralReport");
    Route::get("/getStats","ReportsController@getStats");
    Route::get("/getMatches","VerificationController@getMatches");
    Route::get("/getIvpImage","VerificationController@loadImage");
    Route::post("/uploadNidImages",'MobileAppController@uploadNidImages');
    Route::get("/getNidNumber",'MobileAppController@getNidNumber');
    Route::get("/getEvents",'FormController@getEvents');
});


// Public quotas are separated by route so lookups do not consume login/submission quota.
Route::group(['middleware' => ['public.throttle','LogRequest']], function () {
    Route::post("/login","MobileAppController@login");
    Route::any("/submit-individual-form","FormController@submitIndividualForm");
    Route::any("/track","FormController@track");
    Route::any("/findApplication","FormController@findApplication");
    /** THIS ROUTE NEEDS TO BE SECURED */
    Route::get("previewApplication",'FormController@previewIndividualForm');
    Route::any("/saveForm","FormController@saveForm");
    Route::get("/getAppointments","AppointmentsController@getAppointments");
    Route::any("/uploadFile","FormController@uploadFile");
    Route::any("/searchVillages","FormController@searchVillages");
    Route::any("/searchDistricts","FormController@searchDistricts");
    Route::any("/searchProvinces","FormController@searchProvinces");
    Route::any("/searchCenters","FormController@searchCenters");
    Route::any("/getDistricts","FormController@getDistricts");
    Route::post("/validate","FormController@validateSteps");
    Route::get("/validateFamilyFormReferenceNo",function(Request $r){
        if( in_array($r->ip(),['3.12.248.22','127.0.0.1','149.54.11.58'])  == false){
            return response([
                'status'=>'You are not allowed to access from this IP'
            ]);
        }
        $reference = \App\Individualform::where('family_form_reference_no',$r->input('reference_no'))->exists();
        if($reference){
            return response([
                'status'=>'ok'
            ],200);
        }
    
        return  response([
            'status'=>'ok'
        ],404);
    
    });
    
});
/*---------------------------------------*/


Route::get('/applicationsCount',function(Request $r){
    $count = Cache::get('count');
    $dailyCount=6208503;
    if(!$count){
    $count = \App\Individualform::where('apply_for_new_id','بلی')->count();
        Cache::put('count',$count,300);
    }   
    $count = number_format($count,0);
    $dailyCount = number_format($dailyCount,0);
    if($r->input('lang') == 'fa'){
        $western_arabic = array('0','1','2','3','4','5','6','7','8','9');
        $eastern_arabic = array('٠','١','٢','٣','٤','٥','٦','٧','٨','٩');
        $count = str_replace($western_arabic, $eastern_arabic, $count);     
        $dailyCount = str_replace($western_arabic, $eastern_arabic, $dailyCount);     
    }
  
        return[
            'total_applications'=>$count,
            'total_enrolment'=>$dailyCount
        ];
});


Route::middleware(['auth:api', 'active.api'])->group(function(){
    Route::get('/getCallList', 'CallCenterController@getCallList');
    Route::get('/getOutcomeList', 'CallCenterController@getOutcomeList');
    Route::post('/submitOutcome', 'CallCenterController@submitOutcome');
    Route::post('/updateApplicationsStatus', 'CallCenterController@updateApplicationsStatus');
    Route::get("/getCenterUsers",'UsersController@getCenterUsers');
    Route::get("/downloadActivityReport","ReportsController@downloadActivityReport");
});

Route::middleware(['auth:api', 'active.api'])->group(function () {
    Route::get("/downloadTazkiraFiles", 'MobileAppController@downloadTazkiraFiles');
    Route::get("/downloadPhoto", 'MobileAppController@downloadPhoto');
});

