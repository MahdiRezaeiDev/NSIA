    <head>
        <style>
            @font-face {
                font-family: 'bahij';
                src: url("{{asset('fonts//bahij.ttf')}}") format('truetype')
            }

            body {
                font-family: 'bahij';
                color: black;
                font-size: 12px;

            }

            .required_field {
                color: red;
                font-size: 10px;
            }


            td {
                font-size: 12px;

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
                font-size: 14px;
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

    <body dir="rtl" >
    <br>
    <br>
            <div style="margin-top:10%;width:100%;color:black;font-size:25px;padding-top:20%;background:url({{public_path()}}/img/dari_id.jpg);background-repeat:no-repeat;background-size: 100%;">
                <table width="100%" style="margin-right:5%">
                            <tr>
                                <td >نوم / نام (تخلص) </td>
                                <td > د زیږېدنې ځای / محل تولد</td>
                                <td rowspan="6">
                                @if($review->getPhoto())
                                <img src="{{$review->getPhoto(true)}}" width="140px" height="180px">
                               
                                 @endif
                                 </td>

                            </tr>
                            <tr>
                                <td > {{ $review->name }} {{ $review->surname }}</td>
                                <td> {{ $review->birth_province}}</td>
                                <td> </td>

                            </tr>
                            <tr>
                                <td style="padding:0px"> د بلار نوم / نام پدر </td>
                                <td>اوسنی هستوګنځی / سکونت فعلی</td>
                                <td> </td>

                            </tr>
                            <tr>
                                <td > {{ $review->father_name }} </td>
                                <td> {{ $review->current_residence_province}}</td>
                                <td> </td>

                            </tr>

                            <tr>
                                <td> د نیکه نوم / نام پدرکلان </td>
                                <td>اصلي هستوګنځی / سکونت اصلی</td>
                                <td> </td>

                            </tr>
                            <tr>
                                <td > {{ $review->grand_father_name }} </td>
                                <td> {{ $review->original_residence_province}}</td>
                                <td> </td>

                            </tr>


                            <tr>
                                <td colspan="3">

                                    <table style="width:100%;color:black;font-size:25px;">
                                        <tr>
                                            <td>د زیږېدنې نېټه /تاریخ تولد </td>
                                            <td>دین</td>
                                            <td> قوم</td>
                                            <td> ملت</td>

                                        </tr>
                                        <tr>
                                            <td style="padding-right:4%;width:25%">{{ $review->birthday_day}} /
                                                {{ $review->birthday_month}} / {{ $review->birthday_year}} </td>
                                            <td style="width:25%"> {{ $review->religion}} </td>
                                            <td style="width:25%"> {{ $review->getEthnicityText($review->ethnicity)}}</td>
                                            <td style="width:25%"> افغان </td>
                                        </tr>
                                    </table>
                                </td>



                            </tr>





                        </table>


            
            </div>
            
            <div style="margin-top:5%;width:100%;color:black;font-size:25px;padding-top:13%;background:url({{public_path()}}/img/english_id.jpg);background-repeat:no-repeat;background-size: 100%">
            <table
                            style="width:100%;color:black;font-size:25px;text-direction:ltr;padding-left:25%;padding-top:5%"
                            dir="ltr">
                            <tr>
                                <td> ID Number </td>
                                <td style="font-weight:bolder"> SAMPLE 000-000-000</td>


                            </tr>
                            <tr>
                                <td colspan="2"> Name SURNAME <br>
                                    <strong> {{ $review->english_name}} {{ $review->english_surname }}</strong>
                                </td>

                            </tr>

                            <tr>
                                <td>
                                    Place of Birth <br>
                                    <b>{{$review->villageToEnglish('province',$review->birth_province)}} </b>
                                </td>
                                <td>
                                    Date of Birth <br>
                                    <b> {{$review->birthday_day}} / {{$review->birthday_month}}
                                        /{{$review->birthday_year}}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Date of Issue <br>
                                    <b>00/00/0000 </b>
                                </td>
                                <td>
                                    Gender <br>
                                    <b> {{$review->gender_english}}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Nationality <br>
                                    <b>AFGHAN</b>
                                </td>
                                <td>
                                    د صدور نیټه / تاریخ صدور
                                    <br> <b> 00/00/0000</b>
                                </td>
                            </tr>


                        </table>

                        <h2 style="font-size:28px;color:black;padding:3%" dir="ltr">
                            I < SAMPLE 00000000 < 000000 <<<<<<<<<< <br>
                                000000000000000000AFG <<<<<<<<<<<<<< </h2> 
            </div>
            
     </body> 
</html>
