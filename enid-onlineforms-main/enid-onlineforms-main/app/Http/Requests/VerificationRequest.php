<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VerificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
   
        return $this->user()->role =='verificationApi';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            'reference_no'=>'required',
            'username'=>'required',
            'status'=>'required|in:verified,not_verified,guarantor-needed',
            'ivp_reference_no'=>'required_if:status,verified'
        ];
    }
}
