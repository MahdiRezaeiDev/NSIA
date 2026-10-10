<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Districtexists implements Rule
{
    private $request;
    private $attribute;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($request)
    {
        $this->request = $request;
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
        $this->attribute=$attribute;
        $provinceAttributeName = str_replace("district",'province',$attribute);
        $province = $this->request->input($provinceAttributeName);
        return \App\Village::where('province',$province)->where('district',$value)->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {

        if( strpos($this->attribute,'original_residence.district') ){
            $applicantName = str_replace("original_residence.district",'name',$this->attribute);
            $applicantName = $this->request->input($applicantName);

            return "محل سکونت اصلی $applicantName در سیستم پیدا نشد!";
        }
        return 'یکی از ولسوالی های درج شده در سیستم موجود نیست!';
    }
}
