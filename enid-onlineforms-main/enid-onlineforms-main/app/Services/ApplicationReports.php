<?php

namespace App\Services;

class ApplicationReports
{
    public static function events()
    {
        $user = \Auth::user();
        $query = \DB::table('events as e')->join('individualforms as f', 'f.reference_no', '=', 'e.reference_no')
            ->leftJoin('users as u', 'u.id', '=', 'e.user_id')->leftJoin('centers as c', 'c.id', '=', 'f.center_id')
            ->select(['e.id', 'e.user_id', 'e.created_at', 'e.created_at as event_date',
                'e.description', 'e.description as status_description', 'f.reference_no', 'f.center_id',
                'f.name', 'f.surname', 'f.father_name', 'f.father_surname',
                'f.grand_father_name', 'f.grand_father_surname', 'f.primary_contact_no', 'f.secondary_contact_no',
                'c.name as center_name'])->selectRaw("COALESCE(u.name, 'نامعلوم') as username");
        if (!$user) {
            return $query->whereRaw('1 = 0');
        }
        if ($user->role === 'center_manager') {
            return $query->where('f.center_id', '>', 13)->where('f.center_id', '<', 89);
        }
        if (!$user->isAdmin() && $user->role !== 'audit') {
            $query->where('f.center_id', $user->center_id);
        }
        return $query;
    }

    public static function dates($request, $startKey = 'appointment_start_date', $endKey = 'appointment_end_date')
    {
        $request->validate([$startKey => ['required', 'regex:/^\d{4}-\d{1,2}-\d{1,2}$/'],
            $endKey => ['required', 'regex:/^\d{4}-\d{1,2}-\d{1,2}$/']]);
        $dates = [];
        foreach ([$startKey, $endKey] as $key) {
            $parts = array_map('intval', explode('-', $request->input($key)));
            if (!\Morilog\Jalali\CalendarUtils::checkDate($parts[0], $parts[1], $parts[2])) {
                ApplicationAccess::fail('تاریخ راپور درست نیست.', 422);
            }
            $dates[] = (new \Morilog\Jalali\Jalalian($parts[0], $parts[1], $parts[2]))->toCarbon();
        }
        if ($dates[0]->gt($dates[1])) {
            ApplicationAccess::fail('تاریخ شروع نباید پس از تاریخ ختم باشد.', 422);
        }
        return $dates;
    }
}
