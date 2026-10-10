@if($loadCss)

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
    @endif

    <table width="100%">
        @if($loadCss)
        <tr>
            <td style="text-align:right">
                <img src="{{public_path()}}/img/afg_logo.jpg" width="80px">
            </td>
            <td>
                <h2 style="padding:0px;margin:0px;text-align:center;font-weight:bold;font-size:15px;">د الکترونیکي تذکرو
                    کورنۍ فورمه</h2>
                <h2 style="padding:0px;margin:0px;text-align:center;font-size:15px">د نفوسـو د احوال ثبتولو لوی ریاست</h2>
            </td>
            <td>
                <h2 style="padding:0px;margin:0px;text-align:center;font-weight:bold;font-size:15px;">فـورم فامیلی
                    تذکـره الکترونیـکی</h2>
                <h2 style="padding:0px;margin:0px;text-align:center;font-size:15px">ریاست عمـومی ثبت احــوال نفـوس</h2>
            </td>
            <td style="text-align:left;">
                <img src="{{public_path()}}/img/logo_black.jpg" width="140px" align="left">
            </td>
        </tr>
        @endif
        <tr>
            <td width="300px"> 
        
            </td>
            @if($form->isAppointmentEnabled())
            <td style="text-align:center;border:1px solid red;text-align:center;" >

                    نوبت
                    @if($form->appointment()->exists())
                        {{$form->appointment()->first()->queue_no}}
                    @endif 
           
              
            </td>
            @endif
        
            <td></td>
            <td></td>
            <td>
                <h1 style="text-align:center;font-size:14px"> شماره فورم فامیلی :{{$form->family_form_reference_no}} </h1>

            </td>
        </tr>
        @if($form->isAppointmentEnabled())
        <tr>
            <td colspan="3">
            <p>      مهرباني وکړئ ټولې فورمې چاپ او په {{$form->getAppointmentDate()}} بجو پورې، د {{$form->centerName()}} څانګې ته مراجعه وکړئ!
            </p>
            <p>لطفاً تمام فورم ها را پرنت نموده بتاریخ  {{$form->getAppointmentDate()}} به مرکز {{$form->centerName()}} مراجعه نمایید!</p>
            </td>
        </tr>
        @endif
        
    </table>



    <table class="members" cellspacing="0px" width="100%">
        <tr>
            <th style="width:5%;background-color:#D1D2D4;">
               شمیره<br> شماره
            </th>
            <th width="15%">نوم او تخلص /نام و تخلص</th>
            <th width="15%">د پلار نوم / نام پدر</th>
            <th width="15%">د نیکه نوم / نام پدر کلان <br> نام پدر و تخلص</th>
            <th width="10%">جنس</th>
            <th width="10%">د کورنۍ د مشر سره تړاو  / قرابت با رییس فامیل</th>
            <th width="5%" > وفات</th>
            <th width="10%"> بهرنی تبعه / تبعه خارجی</th>
            <th width="15%"> د الکترونیکي تذکرې غوښتنه / درخواست تذکره الکترونیکی</th>
            
        </tr>
        @foreach( $members as $index=>$i )
        <tr>
            <td style="border:1px solid black;background-color:#D1D2D4;">{{$index+1}}</td>
            <td style="border:1px solid black;padding-right:2%">
                {{$i->name}} {{$i->surname}}
                @if(!$loadCss && $i->hasApplied())
                    <a href="/viewIndividualApplication?reference_no={{$i->reference_no}}" class="btn btn-primary btn-block"> تفصیلات </a>
                @endif
                
              
            </td>
            <td style="border:1px solid black;">{{$i->father_name}} {{$i->father_surname}}</td>
            <td style="border:1px solid black;">{{$i->grand_father_name}} {{$i->grand_father_surname}}</td>
            <td style="border:1px solid black;padding:0px !important;">
             
                <table>
                    <tr>
                        <td>نارینه / مرد</td>
                        <td>
                        @if( $i->gender == 1 )
                            <img src="{{public_path()}}/img/checked.jpg">
                        @else
<img src="{{public_path()}}/img/unchecked.jpg">
                        @endif
                        </td>
                    </tr>
                    <tr>
                        <td>ښځینه / زن</td>
                        <td>
                        @if( $i->gender == 2 )
                            <img src="{{public_path()}}/img/checked.jpg">
                        @else
                            <img src="{{public_path()}}/img/unchecked.jpg">
                        @endif
                        </td>
                    </tr>
                </table>
            </td>
            <td style="border:1px solid black;">{{$i->getRelationshipDescription()}}</td>
            <td style="border:1px solid black;text-align:center">
                @if( $i->living_status == 2 )
                    <img src="{{public_path()}}/img/checked.jpg">
                @else
                <img src="{{public_path()}}/img/unchecked.jpg">
                @endif
            </td>
            <td style="border:1px solid black; text-align:center">
                @if( $i->living_status == 3 )
                    <img src="{{public_path()}}/img/checked.jpg">
                @else
                <img src="{{public_path()}}/img/unchecked.jpg">
                @endif
            </td>
            <td style="border:1px solid black;text-align:center">
                @if( $i->apply_for_new_id  == 'بلی')
                    <img src="{{public_path()}}/img/checked.jpg">
                @else
                <img src="{{public_path()}}/img/unchecked.jpg">
                @endif
                @if( strlen($i->digital_id_number) > 0)
                <br>
                شماره تذکره الکترونیکی {{ $i->digital_id_number }} 
                @endif
            </td>


        </tr>

        @endforeach
        @if($loadCss)
        <tr>
            <td style="padding:2%;border:1px solid black;font-size:100%;" colspan="9">
                زه تصدیق کوم چې په دې فورمه کې لیکل شوي معلومات سم او کره دي ؛ که چېرته پورتني معلومات غلط ثابت شي ، هر ډول قانوني چلند منم. 
                <br>
          من تصدیق می کنم که معلومات مندرج این فورم صحت و موثق می باشد؛ در صورتیکه معلومات فوق غلط ثابت گردد ، هر نوع عواقب قانونی را می پذیرم.

                <br>
                <br>
                د کورنی د مشر امضا یا د ګوتې نښه / امضا یا نشان انگشت رییس فامیل
                (_____________________________________________) <span style="float:left"> تاریخ :
                    ........../........../.................</span>
            </td>
        </tr>
        <tr>
                <td style="background-color:#D1D2D4;;text-align:center;border:1px solid black" colspan="9" >
                    <h2 style="font-size:80%"> د لادنې برخې ډکول ادارې پورې اړه لري / خانه پری بخش ذیل مربوط اداره می باشد</h2>
                </td>
        </tr>
        <tr>
            <td colspan="9" style="border:1px solid black">
                <table width="100%">
                
                    <tr>
                        <td width="20%">
                            <strong> د کورنی فورمې شمېره / شماره فورم فامیلی</strong>
                        </td>
                        <td width="5%"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td width="3%"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td width="3%"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td width="3%" style="border:1px dashed black;padding:5px"></td>
                        <td></td>

                    </tr>
                </table>
            </td>
        </tr>
        @endif
        </table>



        @if($loadCss)
</body>
@endif
