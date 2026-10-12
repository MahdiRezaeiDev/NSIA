<?php

namespace App\Services;

use App\Individualform;

class IdentityVerification
{
    public function validate(Individualform $form, $code)
    {
        if (!is_string($code) || trim($code) === '' || !config('app.ivp_url')) {
            return false;
        }
        try {
            return $form->verifyVerificationCode($code) === true;
        } catch (\Throwable $exception) {
            \App\Log::record('VerificationServiceUnavailable', ['reference_no' => $form->reference_no]);
            ApplicationAccess::fail('خدمت تثبیت هویت در دسترس نیست؛ دوباره کوشش نمایید.', 503);
        }
    }
}
