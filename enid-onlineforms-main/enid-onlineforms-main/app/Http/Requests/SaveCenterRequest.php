<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Http\Requests\CustomRequest;
class SaveCenterRequest extends CustomRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->role == 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'      =>'required',
            'province'  =>'required',
            'fee'       =>'required',
            'currency'  =>'required',
            'ip'        =>'ip',
          
        ];
    }

    public function messages(){
        return [
            'name.required'=>' اسم مرکز ضروری میباشد',
            'province.required'=>'ولایت ضروری میباشد',
            'ip.ip'=>'لطفاً آی پی آدرس صحیح را وارد سازید',
        ];
    }
}
