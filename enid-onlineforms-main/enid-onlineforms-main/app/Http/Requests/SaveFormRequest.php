<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\CustomRequest;
class SaveFormRequest extends CustomRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
           // 'dob_day'=>'required|numeric',
           // 'dob_month'=>'required|numeric',
          //  'dob_year'=>'required|numeric'
        ];
    }

    public function messages(){
        return [
            'dob_day.required'=>'روز تولد ضروری میباشد',
            'dob_day.numeric'=>'روز تولد تنها میتواند عدد باشد.',
            'dob_month.required'=>'ماه تولد ضروری میباشد',
            'dob_month.numeric'=>'ماه تولد تنها میتواند عدد باشد.',
            'dob_year.required'=>'سال تولد ضروری میباشد',
            'dob_year.numeric'=>'سال تولد تنها میتواند عدد باشد.',
        ];
    }
}
