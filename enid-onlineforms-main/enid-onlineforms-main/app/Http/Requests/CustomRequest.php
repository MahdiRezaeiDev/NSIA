<?php

namespace App\Http\Requests;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;


class CustomRequest extends FormRequest
{

      
   
    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = $this->formatErrors($validator);
        $errors = ['status' => 'error', 'errors' => $errors];

        throw (new ValidationException($validator,response()->json($errors,422)));

    }

    protected function formatErrors(Validator $validator)
    {
       $messages = [];
       $errors = $validator->getMessageBag()->toArray();
       foreach($errors as $e):
        foreach($e as $m):
            $messages[] = $m;
        endforeach;
       endforeach;
       return $messages;
    }

     public function response(array $errors)
    {
      
        $errors = ['status'=>'error','errors'=>$errors];
        return new JsonResponse($errors, 200);
    }
}   
