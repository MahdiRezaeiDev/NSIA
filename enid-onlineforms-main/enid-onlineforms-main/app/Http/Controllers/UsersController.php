<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Center;
use Auth;
use App\Http\Requests\SaveUserRequest;
use App\Http\Requests\SaveCenterRequest;
use Illuminate\Support\Facades\Hash;
use App\Individualform;
use App\Appointment;
use App\Rules\MatchOldPassword;
class UsersController extends Controller
{
    public function index(){
        return view('users');
    }

    public function getUsers(Request $r){
       
        if( $r->input('q') ){
            return User::where('name','like','%'.$r->input('q')."%")->orWhere('role',$r->input('q'))->orWhere('email',$r->input('q'))->paginate($r->input('limit',50));
        }
        return User::paginate($r->input('limit',50));
    }

    public function logout(Request $r){
            $user = $r->user();
            if($user){
                \DB::table('individualforms')->where('opened_by_user_id',$user->id)->update([
                    'opened'=>false,
                    'opened_by'=>'',
                    'opened_by_user_id'=>0
                ]);
            }
            \Auth::logout();

            return redirect("/");
        
    }

    public function newUser(Request $r){
        $user = [];
        if($r->input('id')){
            $user = User::where('id',$r->input('id'))->first();
            if(!$user){
                abort(404);
            }
        }
       
        return view('new_user',['user'=>$user]);
    }
    public function newCenter(Request $r){
        $center=[];
        if($r->input('id')){
            $center = Center::where('id',$r->input('id'))->first();
            if(!$center){
                abort(404);
            }
        }
       
        return view('new_center',
            [
                'center'=>$center,
                'days'=>Appointment::days(),
                'months'=>Appointment::months(),
                'years'=>Appointment::years(),
                'times'=>Appointment::times(),
                'templates'=>\App\Template::get()
               
            
            ]);
    }

    public function saveUser(SaveUserRequest $r){
        if( $r->input('id') ){
            $user = User::where('id',$r->input('id'))->first();
            if(!$user){
                return ['errors'=>['یک مشکل رخ داد!']];
            }
        }else{
            $user = new User;
        }

        $user->name          = $r->input('name');
        $user->email         = $r->input('email');
        $user->role          = $r->input('role');
        $user->active        = $r->input('active');
        $user->center_id     = $r->input('center_id');
        if( !strlen($r->input('password')) == 0){
            $user->password      = bcrypt( $r->input('password'));
        }
       
        $user->save();
    }
    public function centers(){
        return view('centers');
    }

    public function saveCenter(SaveCenterRequest $r)
{
    if ($r->input('id')) {
        $center = Center::where('id', $r->input('id'))->first();
        if (!$center) {
            return ['errors' => ['یک مشکل رخ داد!']];
        }
    } else {
        $center = new Center;
    }

    $center->name         = $r->input('name');
    $center->village      = $r->input('village');
    $center->town         = $r->input('town');
    $center->province     = $r->input('province');
    $center->country      = $r->input('country');
    $center->ip           = $r->input('ip');
    $center->currency     = $r->input('currency');
    $center->status     = $r->input('status');
    $center->enable_appointments = $r->input('enable_appointments',false);
    $center->number_of_days_before_appointment            = $r->input('number_of_days_before_appointment',1);
    $center->fee          = $r->input('fee');
    $center->appointments = $r->input('appointments', []);


    $center->save();
}

    public function getCenters(Request $r){
        if($r->input('limit') == 'all'){
            return Center::orderBy('name')->get();
        }
        if( $r->input('q') ){
            return Center::where('name','like','%'.$r->input('q')."%")
                            ->orWhere('village',$r->input('q'))
                            ->orWhere('town',$r->input('q'))
                            ->orWhere('province',$r->input('q'))
                            ->paginate($r->input('limit',50));
        }
        return Center::paginate($r->input('limit',50));
    }

    public function getRoles(){
        return User::getRoles();
    }

    public function userDashboard(){
        $individualApplicationsCount= Individualform::getApplications()->count();
        return view('user_dashboard',[
            'individualApplicationsCount'=>$individualApplicationsCount
        ]);
    }

    public function viewChangePassword(){
        return view('change_password_form');

    }
    public function changePassword(Request $request){
        /*
        * Validate all input fields
        */
        $messages = [
            'old_password.required' => 'پاسورد فعلی شما ضرور است',
            'new_password.required' => 'پاسورد جدید شما ضرور است',
            'new_password_confirmation.required' => ' تایید پاسورد جدید شما ضرور است',
            'new_password.min' => 'پاسورد از 6 کاراکتر کمتر بوده نمی تواند',
            'new_password.different' => 'پاسورد جدید باید متفاوت از پاسورد قبلی باشد',
            'new_password_confirmation.same'=>'تایید پاسورد اشتباه است',
        ];
        $request->validate( [
            'old_password' => ['required', new MatchOldPassword],
            'new_password' => ['required','min:6','different:old_password'],
            'new_password_confirmation' => ['required','same:new_password']
        ],$messages);

        $user = Auth::user();
        $user->update(['password'=> bcrypt( $request->input('new_password'))]);
        return response()->json([
            'error' => false,
            'message' => 'password successfully updated!'
        ], 200);
    }
       public function getCenterUsers(Request $r){
        if($r->user()->role == 'team_leader'){
           $users =collect([[
               'id'=>0,
               'text'=>'تمام کارمندان',
               'role'=>'تمام کارمندان'
           ]]);
           $dbUsers=\App\User::where('center_id',$r->user()->center_id)->get()->map(function($u){
                return [
                    'id'=>$u->id,
                    'text'=>$u->name." (".$u->role_in_dari.")",
                    'role'=>$u->role
                ];
            });

            return $users->merge($dbUsers);
        }
        return [];
    }
    
}
