<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CallOutcomeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->role == 'call_center';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
       
        return [
            'reference_no'=>'required|exists:individualforms,family_form_reference_no',
            'code'=>'required',
            'call_duration'=>'required',
            'recording'=>'file',
        ];
    }
}
