<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
class User extends Authenticatable
{
    use HasApiTokens,Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends=[
        'roleInDari'
    ];

    public function canAccessApplication($status){
        
        if($this->role == 'admin'){
            return true;
        }

        return in_array($status,$this->getApplicationAccessStatus());

    }
    public function getApplicationAccessStatus(){
        if($this->role == 'receiption'){
            return [];
        }
        if($this->role == 'audit'){
            return [];
        }
        if($this->role == 'document_checker'){
            return [0,1,2,4,5,3,13,14];
        }

        if($this->role == 'id_verifier'){
            return [0,3,4,5];
        }
        if($this->role == 'call_center'){
            return [];
        }
        if($this->role == 'rm_operator'){
            return [];
        }
        if($this->role == 'rm_quality_control'){
            return [];
        }
        if($this->role == 'bio_metrics'){
            return [];
        }
        if($this->role == 'printed_card_receiver'){
            return [];
        }

        if($this->role == 'card_activator_distributor'){
            return [4,13];
        }
        if($this->role == 'team_leader'){
            return [0,1,2,3,4,5,13,15,6,14];
        }
        if($this->role == 'center_manager'){
            return [0,1,2,3,4,5,13];
        }
      

        return null;
    }

    public static function getRoles(){
        return [
            'admin',
            'receiption',
            'document_checker',
            'id_verifier',
            'call_center',
            'rm_operator',
            'rm_quality_control',
            'bio_metrics',
            'team_leader',
            'printed_card_receiver',
            'card_activator_distributor',
            'archiver',
            'audit',
            'center_manager'
        ];
    }

    public function isAdmin(){
        return $this->role == 'admin';
    }

    public function getRoleInDariAttribute(){
        return User::roleToDari($this->role);
    }

    public static function roleToDari($role){
        $dariRole ='نا معلوم';
        switch ($role) {
            case 'receiption':
                $dariRole='پذیرش';
                # code...
                break;
            case 'admin':
                    $dariRole='admin';
                    # code...
                    break;
            case 'document_checker':
                    $dariRole='چک اسناد';
                    # code...
                    break;
            case 'id_verifier':
                    $dariRole='تثبیت هویت';
                    # code...
                    break;
            case 'call_center':
                    $dariRole='مرکز تماس';
                    # code...
                    break;

            case 'rm_operator':
                    $dariRole='ثبت نام';
                    # code...
                    break;
            case 'rm_quality_control':
                    $dariRole='تصدیق ثبت نام';
                    # code...
                    break;

            case 'bio_metrics':
                    $dariRole='بایو';
                    # code...
                    break;
            case 'audit':
                $dariRole='تفتیش';
                    # code...
                    break;
            case 'printed_card_receiver':
                    $dariRole='تسلیم گیرنده کارت چاپ شده';
                    # code...
                    break;


            case 'card_activator_distributor':
                    $dariRole='فعال کننده کارت';
                    # code...
                    break;
            case 'team_leader':
                    $dariRole='آمر مرکز';
                    # code...
                    break;
            
            default:
                # code...
                break;
        }

        return $dariRole;
    }


    public function isIpAllowed($ip){
        if($ip == '127.0.0.1'){
            return true;
        }
        return true;
        $center = $this->center()->first();
        if($center){
            if($ip == $center->ip){
                return true;
            }
        }

        return false;
    }


    public function center(){
        return $this->belongsTo(\App\Center::class);
    }
    public function getCacheName($requestParams){
        return $this->id.implode($requestParams).$this->center_id;
    }

    public function canVerify(){
        $center = $this->center()->first();
        return $this->role == 'team_leader' && $center->country <> 1;
    }
}
