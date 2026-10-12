<?php

namespace App\Services;

use App\Individualform;
use Illuminate\Support\Facades\Storage;

class AttachmentStorage
{
    public static function disk()
    {
        return Storage::disk(config('attachments.disk'));
    }

    public static function containsPath($value, $path)
    {
        if (!is_array($value)) {
            return false;
        }
        if (isset($value['path']) && $value['path'] === $path) {
            return true;
        }
        foreach ($value as $child) {
            if (is_array($child) && static::containsPath($child, $path)) {
                return true;
            }
        }
        return false;
    }

    public static function authorizePath($user, $path)
    {
        if (!is_string($path) || !preg_match('~^(uploads|applications)/[A-Za-z0-9._-]+$~D', $path) || strpos($path, '..') !== false) {
            ApplicationAccess::fail('مسیر فایل درست نیست.', 422);
        }
        if (preg_match('~^applications/([A-Za-z0-9-]+)\.pdf$~D', $path, $match)) {
            $form = Individualform::where('reference_no', $match[1])->orWhere('family_form_reference_no', $match[1])->first();
            if ($form) {
                ApplicationAccess::read($user, $form);
                return $form;
            }
        } else {
            $name = basename($path);
            $pattern = '%'.str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $name).'%';
            foreach (Individualform::where('attachments', 'like', $pattern)->cursor() as $form) {
                if (static::containsPath($form->attachments, $path)) {
                    ApplicationAccess::read($user, $form);
                    return $form;
                }
            }
        }
        ApplicationAccess::fail('فایل پیدا نشد.', 404);
    }
}
