<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class BirthdayRule implements Rule
{
    private $request=null;
    private $message = "لطفا تاریخ تولد درست را تایپ کنید!";
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($request)
    {
        $this->request  = $request;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
    
        $fieldNamePosition = strpos($attribute,"_day");
        if($fieldNamePosition ===false){
            $fieldNamePosition = strpos($attribute,"_month");
        }
        if($fieldNamePosition ===false){
            $fieldNamePosition = strpos($attribute,"_year");
        }
        $fieldName  = substr($attribute,0,$fieldNamePosition);
       
        $day        = $this->request->input($fieldName.'_day');
        $month      = $this->request->input($fieldName.'_month');
        $year       = $this->request->input($fieldName.'_year');
        if(!$day || !$month || !$year ){
          
            return false;
        }
        try{
            $date = new \Hijri((int) $year,(int) $month,(int)$day);
           
        }catch(\Throwable $e){
            $day        = $this->request->input($fieldName.'_day');
            $month      = $this->request->input($fieldName.'_month');
             $year       = $this->request->input($fieldName.'_year');
     
            return false;
        }
       
        if( $this->request->input('relationship_with_head_of_family') == '1' && $date->toCarbon()->floatDiffInYears(\Carbon\Carbon::now()) >= 18){
            $this->message='سن رئیس فامیل باید حد اقل ۱۸ سال باشد.';;
            return true;
        }
       
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}
