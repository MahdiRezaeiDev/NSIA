<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class MaxLength implements Rule
{
    private $maxLength = 0;
    private $fieldName = 0;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($maxLength,$fieldName='')
    {
        $this->maxLength = $maxLength;
        $this->fieldName = $fieldName;
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
        $value = (String) $value;
        return mb_strlen($value) <= $this->maxLength;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->fieldName." باید بیشتر از  ".$this->maxLength." عدد نباشد ";
    }
}
