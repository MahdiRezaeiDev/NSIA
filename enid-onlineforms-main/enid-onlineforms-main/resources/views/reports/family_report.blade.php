<table dir="rtl">
    <thead>
    <tr>
        @if($applications->first())
        <th colspan="8" style="text-align:center;font-size:30px">{{$applications->pluck('center_name')->unique()->count() === 1 ? $applications->first()->center_name : 'راپور مراکز انتخاب‌شده'}}</th>
        @endif
    </tr>
    <tr>
  
      
        <th>شماره درخواستی فامیلی</th>
        <th>تعداد اعضاء فامیل</th>
        <th>شماره تماس دومی</th>
        <th>شماره تماس اولی</th>
        <th>حالت فعلی</th>
        <th>ولد</th>
        <th>اسم</th>
        <th>تاریخ مراجعه</th>
      
     
    </tr>
    </thead>
    <tbody>
    @foreach($applications as $app)
        <tr>
            <td>{{ $app->family_form_reference_no }}</td>
            <td>{{ $app->total_applicants}}</td>
            <td>{{ $app->secondary_contact_no }}</td>
            <td>{{ $app->primary_contact_no }}</td>
            <td>{{ \App\Individualform::getStatusDescription($app->status)}}</td>
            <td>{{ $app->father_name }} {{ $app->father_surname }}</td>
            <td>{{ $app->name }} {{ $app->surname }}</td>
            <td>{{ $app->appointment_date }}</td>
         
        </tr>
    @endforeach
    </tbody>
</table>
