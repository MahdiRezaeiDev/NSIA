@if($loadCss)

<head>
    <style>
        @font-face {
            font-family: 'bahij';
            src: url("{{asset('fonts//bahij.ttf')}}") format('truetype')
        }

        body {
            font-family: 'bahij';
            color: black;
            font-size:12px;
         

        }

        .required_field {
            color: red;
   
        }


        td {
            font-size: 10px;
            padding:0.5%;
        

        }

        .vertical-text {
            -webkit-transform: rotate(90deg);
            -webkit-backface-visibility: hidden;
            transform-origin: 0;
            margin: 0px;
            padding: 0px;
            font-size: 60%;

        }

        .customValue {
            padding-right: 20px;
            
            color: black;
        }

        @media print {
            .new-page {
                page-break-before: always;
            }
        }

    </style>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>

<body dir="rtl">
    @endif
    <table width="100%">
        
        <tr>
            <td width="10%">
                <img src="{{public_path()}}/img/afg_logo.jpg" width="60px">
            </td>
            <td style="text-align:center;width:80%;">

                <h2 style="padding:0px;margin:0px;text-align:center;font-size:12px;">اداره ملی احصائیه و معلومات</h2> 

                @if($review->created_at)
                تاریخ و ساعت {{ \Hijri::fromCarbon( $review->created_at)->format('H:i:s d-m-Y')}} <br>
                @endif
                <img width="300px" height="30px" style="margin-top:5px"
                    src="data:image/png;base64, {{\Barcode::getBarcodePNG($review->family_form_reference_no, "C39",3,33)}}"
                    alt="barcode" /> <br>
                    شماره فامیلی :{{$review->family_form_reference_no}}  

            </td>
         
            <td style="text-align:left;width:10%">
                <img src="{{public_path()}}/img/logo_black.jpg" width="140px" >
            </td>
        </tr>
       
      
    </table>
    <table width="100%" autosize="1">

        <tr>
            <td colspan="4" style="background-color:#D1D2D4;text-align:center">

                <h4>
                   به آمریت محترم عواید:
                
                </h4>
                <p>
                    جهت تحویل نمودن قیمت تذکره الکترونیکی به شما معرفی گردید. از نزدش مبلغ ذکره شده اخذ گردد.
                </p>
            </td>
        </tr>

    </table>
    <table width="100%" cellpadding="0px" cellspacing="0px">
        <tr>
            <td style="border:1px solid black;text-align:Center" colspan="3">شهرت</td>
            <td style="border:1px solid black;text-align:Center" rowspan="2">تعداد اعضای فامیل</td>
            <td style="border:1px solid black;text-align:Center" rowspan="2">ولایت</td>
            <td style="border:1px solid black;text-align:Center" rowspan="2">ناحیه/ ولسوالی</td>
            <td style="border:1px solid black;text-align:Center" rowspan="2">نام مرکز توزیع</td>
            <td style="border:1px solid black;text-align:Center" rowspan="2">مبلغ قابل پرداخت</td>
        </tr>
        <tr>
            <td style="border:1px solid black;text-align:center">اسم</td>
            <td style="border:1px solid black;text-align:center">ولد</td>
            <td style="border:1px solid black;text-align:center">ولدیت</td>
            
        </tr>
        <tr>
            <td style="border:1px solid black">{{$headOfFamily->name}} {{$headOfFamily->surname}}</td>
            <td style="border:1px solid black">{{$headOfFamily->father_name}} {{$headOfFamily->father_surname}}</td>
            <td style="border:1px solid black">{{$headOfFamily->grand_father_name}} {{$headOfFamily->grand_father_surname}}</td>
            <td style="border:1px solid black">{{$review->familyMembers()->where('apply_for_new_id','بلی')->count()}}</td>
            <td style="border:1px solid black">{{$headOfFamily->original_residence_province}}</td>
            <td style="border:1px solid black">{{$headOfFamily->original_residence_district}}</td>
            <td style="border:1px solid black">{{$review->center()->first()->name}}</td>
            <td style="border:1px solid black">{{$review->fee()}}</td>
        </tr>
        <tr>
            <td colspan="3">یادداشت : متقاضی محترم! حین تسلیم دهی فورم آنلاین خویش به مرکز توزیع تذکره الکترونیکی مبلغ فوق الذکر را به بخش عواید همان مرکز تصفیه نمائید.</td>
        </tr>
    </table>


@if($loadCss)
</body> 
@endif
