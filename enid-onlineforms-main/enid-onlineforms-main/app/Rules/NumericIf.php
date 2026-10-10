<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class NumericIf implements Rule
{
    private $required = false;
    private $fieldName = '';
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($required,$fieldName='')
    {
        $this->required     = $required;
        $this->fieldName    = $fieldName;
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
        if($this->required){
            if(is_numeric($value)){
                return true;
            }

            return false;
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
        return $this->fieldName." باید عدد باشد!";
    }
}
