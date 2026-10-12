<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\CustomRequest;
class UploadFileRequest extends CustomRequest
{
    CONST MAX_UPLOAD_SIZE = 5120;
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
            'file'=>'required|file|max:'.UploadFileRequest::MAX_UPLOAD_SIZE.'|mimetypes:image/jpg,image/jpeg,image/png,application/pdf|mimes:jpg,png,jpeg,pdf'
        ];
    }

    public function messages(){
        $max_upload_size = round(UploadFileRequest::MAX_UPLOAD_SIZE/1024)." MB";
        return [
            'file.max'=>'سایز فایل شما نمیتواند بیشتر از '.$max_upload_size.' باشد',
            'file.mimetypes'=>'فایل شما تنها میتواند به فارمت های .jpg, .png و .pdf باشد.',
            'file.mimes'=>'فایل شما تنها میتواند به فارمت های .jpg, .png و .pdf باشد.'
        ];
    }
}
