<?php

namespace App\Services;

use App\Individualform;
use App\User;
use Illuminate\Http\Exceptions\HttpResponseException;

class ApplicationAccess
{
    public static function fail($message, $status = 403)
    {
        throw new HttpResponseException(response()->json(['status' => 'error', 'errors' => [$message]], $status));
    }

    public static function canRead($user, Individualform $form)
    {
        if (!$user || !(int) $user->active) {
            return false;
        }
        if ($user->role === 'verificationApi') {
            return (bool) $form->isSendToIvp;
        }
        if (!in_array($user->role, User::getRoles(), true)) {
            return false;
        }
        if ($user->isAdmin() || $user->role === 'audit') {
            return true;
        }
        if ($user->role === 'center_manager') {
            return $form->center_id > 13 && $form->center_id < 89;
        }
        return $user->center_id !== null && (int) $user->center_id === (int) $form->center_id;
    }

    public static function read($user, Individualform $form)
    {
        if (!static::canRead($user, $form)) {
            static::fail('شما صلاحیت دسترسی به این فورم را ندارید.');
        }
    }

    public static function find($reference, $family = false)
    {
        if (!is_scalar($reference) || is_bool($reference) || strlen((string) $reference) > 128 || (string) $reference === '') {
            static::fail('شمارهٔ فورم درست نیست.', 422);
        }
        $form = Individualform::where($family ? 'family_form_reference_no' : 'reference_no', $reference)->first();
        if (!$form) {
            static::fail('فورم پیدا نشد.', 404);
        }
        return $form;
    }

    public static function canVerify($user, Individualform $form)
    {
        return static::canRead($user, $form) &&
            ($user->isAdmin() || $user->role === 'id_verifier' || $user->canVerify()) &&
            in_array((int) $form->status, [0, 3, 5, 14], true);
    }

    public static function canTransition($user, Individualform $form, $target)
    {
        if (!static::canRead($user, $form) || !is_numeric($target) ||
            !in_array((int) $target, [0, 1, 2, 3, 4, 5, 6, 13, 14, 15], true)) {
            return false;
        }
        $from = (int) $form->status;
        $to = (int) $target;
        // Verified status is set only by a validated verification request.
        if ($to === 4 || $from === 13 || $from === $to) {
            return false;
        }
        if ($to === 13) {
            return $form->canCancel() && ($user->isAdmin() ||
                (in_array($user->role, ['document_checker', 'id_verifier', 'team_leader'], true) &&
                 $user->canAccessApplication($from)));
        }
        if ($to === 3 && $from === 0) {
            return $user->isAdmin() || $user->role === 'id_verifier';
        }
        if ($to === 1 && $from === 4) {
            return $user->isAdmin() || in_array($user->role, ['document_checker', 'team_leader'], true);
        }
        if ($to === 2 && $from === 1) {
            return $user->isAdmin() || in_array($user->role, ['team_leader', 'center_manager'], true);
        }
        if ($to === 6 && in_array($from, [2, 4], true)) {
            return $user->isAdmin() || in_array($user->role, ['card_activator_distributor', 'team_leader'], true);
        }
        return false;
    }
}
