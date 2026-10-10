<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Http\Requests\CustomRequest;
class SaveUserRequest extends CustomRequest
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
        $rules=[
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'role'=>['required', Rule::in( \App\User::getRoles())],
            'center_id'=>'required_unless:role,admin',
            'password'=>'required|confirmed'
        ];

        if($this->input('id')){
            $rules['email'] = 'required|email';
            //If password is blank on edit , no validation required
            if(strlen($this->input('password')) == 0){
                unset($rules['password']);
            }
        }
        return $rules;
    }

    public function messages(){
        return [
            'name.required'=>' اسم کارمند ضروری میباشد',
            'email.required'=>'ایمیل ضروری میباشد',
            'email.email'=>'لطفاً ایمیل صحیح را تایپ کنید',
            'email.unique'=>'یک کارمند قبلاً با این ایمیل آدرس خود را راجستر نموده است',
            'role.required'=>'انتخاب نقش ضروری میباشد',
            'role.in'=>'لطفاً نقش را از لست انتخاب کنید',
            'password.required'=>'پاسورد ضروری میباشد',
            'password.confirmed'=>'تایید پاسورد غلط است',
            'center_id.required_unless'=>'تمام کارمندان که ادمین نمیباشند باید مرکز را انتخاب نمایند.'
        ];
    }
}
