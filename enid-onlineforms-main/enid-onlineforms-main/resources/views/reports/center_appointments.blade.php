<head>
    <style>
        @font-face {
            font-family: 'bahij';
            src: url("{{asset('fonts//bahij.ttf')}}") format('truetype')
        }

        div.page {
            page-break-after: always;
            page-break-inside: avoid;
        }

        body {
            font-family: 'bahij';
            color: black;
            font-size: 11px;

        }

        label {

            color: #2F809F;
            padding-left: 20px;
        }

        .required_field {
            color: red;
            font-size: 11px;
        }

        td {
            font-size: 11px;
            padding-right: 5px;
        }

        th {
            font-size: 11px;
            font-weight:bolder;
            color:black;
            border:1px solid black;
          
        }

        .vertical-text {
            -webkit-transform: rotate(90deg);
            -webkit-backface-visibility: hidden;
            transform-origin: 0;
            margin: 0px;
            padding: 0px;
            font-size: 60%;

        }

        .members>tr>td {
            border: 1px solid black;

        }

        p {
            font-weight: 900;
            font-size: 15px;
        }

        .landscape {
            -webkit-transform: rotate(-90deg);
        }

    </style>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>

<body dir="rtl">
 

    <table width="100%" style="margin-bottom:2%">
      
        <tr>
            <td style="text-align:right">
                <img src="{{config('app.url')}}/img/afg_logo.jpg" width="80px">
            </td>
            
            <td>
                <h2 style="padding:0px;margin:0px;text-align:center;font-weight:bold;font-size:24px;">
                    راپور روزانه مرکز {{$center->name}} 
                </h2>

                <h1 style="text-align:center;font-size:18px"> تاریخ رپور: {{\Hijri::fromCarbon($date)->format('d-m-Y H:i')}} </h1>
                <table width="100%">
                <tr>
        
                        <td style="text-align:center;border:2px solid black;font-size:110%;padding:1%; ">
                            تعداد انفرادی {{count($appointments)}}
                        
                        </td>
                        <td style="text-align:center;border:2px solid black;font-size:110%;padding:1%">
                        تعداد فامیلی {{count($appointments->filter(function($a){ return $a->relationship_with_head_of_family==1;}))}}
                        
                        </td>

                    
                    </tr>
                </table>
            </td>
            <td style="text-align:left;">
                <img src="{{config('app.url')}}/img/logo_black.jpg" width="140px" align="left">
            </td>
        </tr>
   
  
    </table>



    <table class="members" cellspacing="0px" width="100%">
        <tr>
            <th style="width:5%;background-color:#D1D2D4;">
               مسلسل<br> شماره
            </th>
            <th width="5%">شماره فامیلی</th>
            <th width="5%">شماره انفرادی</th>
            <th width="45%">اسم</th>
            <th width="10%">ساعت ملاقات</th>
            <th width="5%">نوبت</th>
            <th width="15%">حالت</th>
        </tr>
        @foreach( $appointments as $index=>$i )
        <tr>
            <td style="border:1px solid black;background-color:#D1D2D4;">{{$index+1}}</td>
            <td style="border:1px solid black;">{{$i->family_form_reference_no}}</td>
            <td style="border:1px solid black;">{{$i->reference_no}}</td>
            <td style="border:1px solid black;">
                {{$i->name}} {{$i->surname}}
            </td>
            <td style="border:1px solid black;">{{ \App\Appointment::formatTime($i->start_time)}} الی {{ \App\Appointment::formatTime($i->end_time)}}</td>
            <td style="border:1px solid black;">{{$i->queue_no}}</td>
            <td style="border:1px solid black;">{{\App\Individualform::getStatusDescription($i->status)}}</td>

        </tr>
        
        @endforeach
       
        </table>
        <h1 style="margin-bottom:1%">راپور کارمندان </h1>
        
        <h2>راپور به اساس وظیفه</h2>
        <?php $total=0;?>
        <table width="100%">
            <tr>
                <td style="border:1px solid black;background-color:#D1D2D4;">وظیفه</td>
                <td style="border:1px solid black;background-color:#D1D2D4;">تعداد پروسیس درخواستی های انفرادی</td>
            </tr>
            @foreach($eventsByRole as $e)
            <tr>
                <td style="border:1px solid black">{{ \App\User::roleToDari($e->role) }}</td>
                <td style="border:1px solid black">{{$e->total}}</td>
            </tr>
            <?php $total=$total+$e->total;?>
            @endforeach
            <tr>
                <td style="border:1px solid black">مجموعا</td>
                <td style="border:1px solid black">{{$total}}</td>
            </tr>
        </table>
        <h2>راپور مختصر کارمندان</h2>
        <table width="100%">
            <tr>
                <td style="border:1px solid black;background-color:#D1D2D4;">اسم</td>
                <td style="border:1px solid black;background-color:#D1D2D4;">وظیفه</td>
                <td style="border:1px solid black;background-color:#D1D2D4;">تعداد پروسیس درخواستی های انفرادی</td>
            </tr>
            <?php $total=0;?>
            @foreach($eventsByUser as $e)
            <tr>
                <td style="border:1px solid black">{{ $e->username }}</td>
                <td style="border:1px solid black">{{ \App\User::roleToDari($e->role) }}</td>
                <td style="border:1px solid black">{{$e->total}}</td>
            </tr>
            <?php $total=$total+$e->total;?>
            @endforeach
            <tr>
                <td style="border:1px solid black" colspan="2">مجموعا</td>
                <td style="border:1px solid black">{{$total}}</td>
            </tr>
        </table>

        <h2>راپور مکمل کارمندان</h2>
        <table width="100%">
            <tr>
                <td style="border:1px solid black;background-color:#D1D2D4;">اسم</td>
                <td style="border:1px solid black;background-color:#D1D2D4;">وظیفه</td>
                <td style="border:1px solid black;background-color:#D1D2D4;">شماره درخواستی انفرادی</td>
                <td style="border:1px solid black;background-color:#D1D2D4;">تاریخ ملاقت</td>
            </tr>
            <?php $total=0;?>
            @foreach($fullReport as $e)
            <tr>
                <td style="border:1px solid black">{{ $e->username }}</td>
                <td style="border:1px solid black">{{ \App\User::roleToDari($e->role) }}</td>
                <td style="border:1px solid black">{{$e->reference_no}}</td>
                <td style="border:1px solid black">{{\App\Appointment::getAppointmentDateByReferenceNo($e->reference_no)}}</td>
            </tr>
      
            @endforeach
       
        </table>

</body>

