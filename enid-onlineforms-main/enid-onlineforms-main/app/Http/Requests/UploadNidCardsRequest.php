<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadNidCardsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
        return $this->user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'images.*.file'=>'required',
            'images.*.record_id'=>'required',
            'signature.sign'=>'required',
            'signature.photo'=>'required',
        ];
    }
}
