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
        @if($loadCss)
        <tr>
            <td width="10%">
                <img src="{{public_path()}}/img/afg_logo.jpg" width="60px">
            </td>
            <td style="text-align:center">

                <h2 style="padding:0px;margin:0px;text-align:center;font-weight:bold;font-size:12px;">د الکترونیکي تذکرو
                    انفرادي فورمه</h2>
                <h2 style="padding:0px;margin:0px;text-align:center;font-size:12px;">د نفوسـو د احوال ثبتولو لوی ریاست</h2>

            </td>
            <td width="35%" style="text-align:center">

                <h2 style="padding:0px;margin:0px;text-align:center;font-weight:bold;font-size:12px;">فـورم انفرادی
                    تذکـره الکترونیـکی</h2>
                <h2 style="padding:0px;margin:0px;text-align:center;font-size:12px;">ریاست عمـومی ثبت احــوال نفـوس</h2>

            </td>
            <td style="padding:0px;background-color:Red" style="text-align:left">
                <img src="{{public_path()}}/img/logo_black.jpg" width="140px" >
            </td>
        </tr>
        @endif
        <tr>
            <td>

            </td>
            <td colspan="2" align="center" style="text-align:center">
                <h1 style="text-align:center;font-size:15px">
                    مرکز: {{$review->centerName()}}
                </h1>
                @if($review->created_at)
                تاریخ و ساعت {{ \Hijri::fromCarbon( $review->created_at)->format('H:i:s d-m-Y')}} <br>
                @endif
                <img width="300px" height="30px" style="margin-top:5px"
                    src="data:image/png;base64, {{\Barcode::getBarcodePNG($review->reference_no, "C39",3,33)}}"
                    alt="barcode" /> <br>
                {{$review->reference_no}}
            </td>

            <td>
                <h1 style="text-align:center;font-size:15px"> شماره :{{$review->reference_no}}
                </h1>

            </td>
        </tr>
    </table>
    <table width="100%" autosize="1">

        <tr>
            <td colspan="4" style="background-color:#D1D2D4;text-align:center">

                <h4>
                    کومې برخې چې ستوري (*) لري ډکول یې حتمي دي او دا په ځیر سره ډکې کړئ / خانه پری خش های که ستاره (*)
                    دارد، حتمی بوده و آنرا با دقت خانه پری نمایید
                </h4>
            </td>
        </tr>

    </table>

                <table width="100%" cellpadding="0px" cellspacing="0px">
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;" width="4%" rowspan="2">1 *</td>
                        <td style="border-bottom:1px solid black;border-top:1px solid black">
                            نوم / نام:
                            <span class="customValue"> {{ $review->name }}</span>
                        </td>
                        <td style="border-bottom:1px solid black;border-top:1px solid black" colspan="3">
                            تخلص:
                            <span class="customValue"> {{ $review->surname }}</span>
                        </td>
                        <td rowspan="8"  style="border:1px solid black;padding-left:3px;width:15%;text-align:center;vertical-align:center;font-size:10px">
                            @if(!$review->getPhoto())
                            انځور / عکس
                            <br>
                            4x3 سانتی متر
                            <br>
                            یو قطعه داسې انځور
                            <br>
                            چې بګروند یې
                            <br>
                            سپین او په
                            <br>
                            وروستیو شپږو
                            <br>میاشتو کې <br> اخیستل شوی وي
                            <br>
                            @else
                                <img src="{{$review->getPhoto(true)}}" width="80px">
                            @endif
                        </td>

                    </tr>
                    <tr>
                        <td
                            style="border-bottom:1px solid black;text-align:left ;padding-left:10px">
                            Surname:
                            <span class="customValue"> {{ $review->english_surname}}</span>
                        </td>
                        <td style="border-bottom:1px solid black;text-align:left ;padding-left:10px"
                            colspan="3">
                            Name:
                            <span class="customValue"> {{ $review->english_name }}</span>
                        </td>


                    </tr>
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-top:0px">2 * </td>
                        <td style="border-bottom:1px solid black;text-align:right;"
                            colspan="3">د پلار نوم / نام پدر:
                            <span class="customValue"> {{ $review->father_name}}</span>
                        </td>

                        <td style="border-bottom:1px solid black;">
                            :تخلص
                            <span class="customValue"> {{ $review->father_surname }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#D1D2D4;border-left:1px solid black;border-right:1px solid black;" width="4%">3 * </td>
                        <td  colspan="3">
                            د نیکه نوم/ نام پدرکلان:
                            <span class="customValue"> {{ $review->grand_father_name}}</span>
                        </td>

                        <td >
                            تخلص:
                            <span class="customValue"> {{ $review->grand_father_surname }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-bottom:0px">4 * </td>
                        <td style="border-top:1px solid black;" colspan="4">
                            د مور نوم / نام مادر:
                            <span class="customValue"> {{ $review->mother_name}}</span>
                        </td>

                    </tr>
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;">5 </td>
                        <td colspan="4" style="padding:0px">
                            <table width="100%" cellpadding="0px" cellspacing="0px">
                                <tr>

                                    <td style="border-bottom:1px solid black;border-top:1px solid black;" width="26%"
                                        rowspan="2">
                                         د زېږېدنې ځای / محل تولد 
                                    </td>
                                    <td style="border-bottom:1px solid black;border-top:1px solid black;"> هیواد/کشور:
                                        &nbsp; <span
                                            class="customValue">{{ $review->getCountryName($review->birth_country) }}</span>
                                    </td>
                                    <td style="border-bottom:1px solid black;border-top:1px solid black;"> ولایت: &nbsp;
                                        <span class="customValue">{{ $review->birth_province }}</span>
                                    </td>
                                    <td style="border-bottom:1px solid black;border-top:1px solid black;"> ولسوالی:
                                        &nbsp;<span class="customValue">{{ $review->birth_district}}</span></td>
                                </tr>

                            </table>
                        </td>

                    </tr>
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-top:0px;border-bottom:0px">6 * </td>
                        <td > 
                                د زېږېدنې نیټه / تاریخ تولد(هـ ش / میلادی)
                              
                               
                        </td>
                        <td style="padding:0px">
                        <span class="customValue" style="margin-right:200px"> 
                        ورځ / روز {{ $review->birthday_day }}</span>
                        </td>
                                    <td style="padding:0px">
                                        میاشت / ماه &nbsp; &nbsp;
                                        <span class="customValue">{{ $review->birthday_month }}</span>
                                    </td>
                                    <td style="padding:0px;backgro">
                                        کال / سال &nbsp; &nbsp;
                                        <span class="customValue">{{ $review->birthday_year }}</span>
                                    </td>

                    </tr>
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black">7 </td>
                        <td style="border-bottom:1px solid black;border-top:1px solid black;">
                        د عسکرۍ خدمت / خدمت عسکری
                        </td>
               
                                    <td style="border-top:1px solid black;border-bottom:1px solid black">
                                    هو / بلی
                                        @if($review->military_service)
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                    </td>
                                    <td style="border-top:1px solid black;border-bottom:1px solid black">
                                        نه / نخیر
                                    </td>
                                    <td style="border-top:1px solid black;border-bottom:1px solid black">
                                        @if(!$review->military_service)
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                    </td>
                              
                    </tr>
                </table>
                <table  cellpadding="0px" cellspacing="0px" width="100%">
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-top:0px" width="4%" >8 </td>
                        <td style="padding:0px;border-bottom:1px solid black;width:10%">
                                زده کړه / سواد : 
                        </td>
                        <td style="border-bottom:1px solid black">
                                        هو / بلی
                        </td>
                        <td style="border-bottom:1px solid black">
                                        @if($review->is_educated)
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                        </td>
                        <td style="border-bottom:1px solid black">
                                        نه / نخیر
                        </td>
                        <td style="border-bottom:1px solid black">
                                        @if(!$review->is_educated)
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                               
                        </td>
                        <td 
                            style="padding:0px;border-bottom:1px solid black;">
                            لومړنی زده کړې / تعلیمات ابتدایی </td>
                                    <td style="border-bottom:1px solid black">
                                        @if($review->education_level == 'لومړنی زده کړرې/تعلیمات ابتدایی')
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                    </td>
                                    <td style="border-bottom:1px solid black">
                                        ۱۲ پاس
                                    </td>
                                    <td style="border-bottom:1px solid black">
                                        @if($review->education_level == '۱۲ پاس' )
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                    </td>
                                    <td style="border-bottom:1px solid black">
                                        ۱۴ پاس
                                    </td>
                                    <td style="border-bottom:1px solid black">
                                        @if($review->education_level == '۱۴ پاس' )
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                    </td>
                                    <td style="border-bottom:1px solid black">
                                        لیسانس
                                    </td>
                                    <td style="border-bottom:1px solid black">
                                        @if($review->education_level == 'لیسانس' )
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                    </td>
                                    <td style="border-bottom:1px solid black">
                                        ماستر
                                    </td>
                                    <td style="border-bottom:1px solid black">
                                        @if($review->education_level == 'ماستر' )
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                    </td>
                                    <td style="border-bottom:1px solid black">
                                        دکتورا
                                    </td>
                                    <td style="border-bottom:1px solid black;border-left:1px solid black">
                                        @if($review->education_level == 'دکتورا' )
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                    </td>

                      
                    </tr>
                    </table>
                    <table width="100%" cellpadding="0px" cellspacing="0px">
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-top:0px" width="4%">9 *</td>
                        <td  style="padding:0px;border-bottom:1px solid black;">
                      
                           
                                        <strong>اصلی استوګنځی / سکونت اصلی</strong>
                        </td>
                        <td style="border-bottom:1px solid black;width:20%">ولایت:

                                        <span class="customValue">{{$review->original_residence_province}} </span>
                      </td>
                       <td style="border-bottom:1px solid black;width:20%">ولسوالی/ ناحیه:
                                        <span class="customValue">{{$review->original_residence_district}}</span>
                       </td>
                        <td style="border-bottom:1px solid black;width:20%;border-left:1px solid black"> کلی / قریه:
                                        <span class="customValue">{{$review->original_residence_village}}</span>
                        </td>


                                
                    </tr>
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-top:0px">10* </td>
                        <td colspan="4" style="padding:0px;border-left:1px solid black;border-bottom:1px solid black">
                            <table cellpadding="3px" cellspacing="0px" width="100%">
                                <tr>

                                    <td style=" solid black;" width="35%" rowspan="2">
                                        <strong>اوسنی استوګنځی / سکونت فعلی</strong>
                                    </td>
                                    <td style=" solid black;font-size:70%">هېواد / کشور:
                                        <span class="customValue">
                                            {{$review->getCountryName($review->current_residence_country)}}</span>
                                    </td>
                                    <td style=" solid black;font-size:70%">ولایت:
                                        <span class="customValue"> {{$review->current_residence_province}}</span>
                                    </td>
                                    <td style=" solid black;font-size:70%">
                                        ولسوالی/ ناحیه:
                                        <span class="customValue"> {{$review->current_residence_district}}</span>
                                    </td>
                                    <td style=" solid black;font-size:70%"> کلی/ قریه: <span class="customValue">
                                            {{$review->current_residence_village}}
                                        </span>
                                    </td>


                                </tr>

                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-top:0px">11 </td>
                        <td colspan="4" style="border-left:1px solid black;border-bottom:1px solid black;">
                            <table width="100%" cellpadding="3px" cellspacing="0px">
                                <tr>
                                    <td width="50%">
                                       
                                            لمړی اړیکشمېره / شماره تماس اولی : <span
                                                class="customValue">{{$review->primary_contact_no}} </span>
                                       
                                    </td>


                                    <td>
                                        
                                            دویمه اړیکشمېره / شماره تماس دومی:<span
                                                class="customValue">{{$review->secondary_contact_no}}</span>
                                      
                                    </td>
                                </tr>

                            </table>
                        </td>

                    </tr>
                </table>
                <table cellpadding="0px" cellspacing="0x" width="100%">
                    <tr>

                        <td style="background-color:#D1D2D4;border:1px solid black;border-bottom:0px;border-top:0px;width:4%">12</td>
                        <td style="width:45%">
                            برېښنا لیک / آدرس ایمیل <span class="customValue">{{$review->email_address}}</span>
                        </td>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-bottom:0px;border-top:0px" width="3.3%">13*</td>
                        <td> مدني حالت / حالت مدنی: </td>
                        <td>
                                        مجرد
                                        @if($review->marital_status== 2 )
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                        </td>
                        <td>
                                        متاهل
                                        @if($review->marital_status== 1 )
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                        </td>
                        <td>
                        کونډ(ه) بیوه
                                        @if($review->marital_status== 3 )
                                       
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                        </td>
                        <td style="border-left:1px solid black">
                                        طلاق
                                        @if($review->marital_status== 4 )
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                               
                        </td>


                    </tr>
                </table>
                    <table width="100%" cellpadding="0px" cellspacing="0px">
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-top:1px solid black;width:4%">14* </td>
                        <td 
                            style="border-bottom:1px solid black;border-top:1px solid black; width:45%">
                             :مورنۍ ژبه / زبان مادری &nbsp; &nbsp; <span
                                    class="customValue">{{ $review->getLocalLanguageText($review->mother_tongue) }}</span>
                           
                        </td>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-bottom:1px solid black;" width="3.3%"> 
                        15 
                        </td>
                        <td style="border-top:1px solid black;border-bottom:1px solid black;border-left:1px solid black">
                                        :بهرنیو ژبو سره بلدتیا / آشنایی به زبان های خارجی
                                        <span
                                            class="customValue">{{ $review->formatForeignLanguages($review->foreign_language_knowledge) }}</span>
                                        <br>
                                        <br>
                                 
                        </td>


                    </tr>
                </table>
                <table width="100%" cellpadding="0px" cellspacing="0px">
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-top:0px;border-bottom:0px;width:4%">16 </td>
                        <td 
                            style="border-bottom:0px;border-top:0px; width:45%">
                            د هیواد له نورو ژبو سره بلدتیا / آشنایی به زبان های کشور
                            <span
                                class="customValue">{{$review->formatLocalLanguages($review->local_language_knowledge) }}</span>
                           
                        </td>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-bottom:0px solid black;border-top:0px" width="3.3%"> 
                        17
                        </td>
                        <td style="border-top:0px;border-bottom:0px ;border-left:1px solid black">
                        د وینې ګروپ / گروپ خون
                                        <span class="customValue">{{$review->blood_group}}</span>
                                        <br>
                                        <br>
                                 
                        </td>


                    </tr>
                </table>
                <table cellpadding="0px" cellspacing="0px" width="100%">
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black" width="4%">18 </td>
                        <td style="border-top:1px solid black;font-size:8px;width:40%;border-bottom:1px solid black" colspan="2">
                       
                                         د اوړي د او سیدلو ځای ( د کوچیانو لپاره )
                                            / محل رهایش
                                            تابستان ( برای کوچی ها )
                                        

                        </td>
                        <td style="width:30%;border-top:1px solid black;border-bottom:1px solid black">
                        ولایت:
                                        <span class="customValue">{{$review->kochi_spring_residence_province}}</span>
                                       
                        </td>
                        <td style="border-left:1px solid black;width:30%;border-top:1px solid black;border-bottom:1px solid black">
                        ولسوالی/ناحیه:
                                        <span class="customValue">{{$review->kochi_spring_residence_district}}</span>
                                     
                         </td>

                        
                    </tr>
                </table>


                <table cellpadding="0px" cellspacing="0px" width="100%">
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;border-top:0px" width="4%">19 </td>
                        <td style="font-size:8px;width:40%;border-bottom:1px solid black" colspan="2">
                       
                        د ژمي د او سیدلو ځای ( د کوچیانو لپاره )
                                            / محل رهایش
                                            زمستانی ( برای کوچی ها )    
                        </td>
                        <td style="width:30%;border-bottom:1px solid black">
                        ولایت:
                                        <span class="customValue">{{$review->kochi_winter_residence_province}}</span>
                                      
                        </td>
                        <td style="border-left:1px solid black;width:30%;border-bottom:1px solid black">
                        ولسوالی/ناحیه:
                                        <span class="customValue">{{$review->kochi_winter_residence_district}}</span>
                                      
                         </td>

                        
                    </tr>
                </table>







                <table width="100%" cellpadding="0px" cellspacing="0px">
                
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;width:4%;border-top:0px;border-bottom:0px solid black">20 * </td>
                        <td  style="width:45%">
                            قوم / قومیت:
                            &nbsp; &nbsp; <span
                                class="customValue">{{ $review->getEthnicityText($review->ethnicity)}}</span>
                        </td>
                      
                                    <td
                                        style="background-color:#D1D2D4;border-left:1px solid black;border-right:1px solid black;width:3.3%;padding:0px;border-bottom:0px solid black">
                                        21* 
                                    </td>
                                    <td style="border-left:1px solid black">
                                      دین: <span class="customValue">{{ $review->religion}}</span>
                                    </td>


                          
                    </tr>
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black">22 </td>
                        <td  style="border-top:1px solid black;border-bottom:1px solid black;width:45%">
                            مذهب:
                            &nbsp; &nbsp; <span class="customValue">{{ $review->religion_sector}}</span>
                        </td>
                     
                                    <td
                                        style="background-color:#D1D2D4;border-left:1px solid black;border-right:1px solid black; width:3.3%;border-top:1px solid black;border-bottom:1px solid black">
                                        23 </td>
                                    <td style="border-top:1px solid black;border-bottom:1px solid black;border-left:1px solid black">
                                        د معلولیت ډول / نوع معلولیت :
                                        <span class="customValue">{{ $review->disability_type}}</span>
                                    </td>

                        
                    </tr>
                    </table>
                    <table cellpadding="0px" cellspacing="0px" width="100%">
                        <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;width:4%;border-top:0px;border-bottom:0px">24 </td>
                        <td  style="width:45%">
                            دنده / وظیفه :
                            &nbsp; &nbsp; <span class="customValue">{{ $review->occupation}}</span>
                        </td>
                        <td style="background-color:#D1D2D4;border-left:1px solid black;border-right:1px solid black; width:3.3%">
                                        25
                        </td>
                        <td>
                                        دویم تابعیت / تابعیت دوم:
                                        <br>
                                        دهېواد نوم / نام کشور :     {{ $review->second_citizenship_country}}
                                       
                        </td>
                        <td>
                                        هو /بلی
                                 
                                        @if($review->has_second_citizenship)
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                        
                                        

                        </td>
                        <td style="border-left:1px solid black">
                                        نه / نخیر
                                   
                                        @if(!$review->has_second_citizenship)
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif


                                  
                        </td>
                    </tr>
                    </table>
                    <table width="100%" cellspacing="0px" cellpadding="0px">
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;width:4%">26 * </td>
                        <td  style="border-top:1px solid black;border-bottom:1px solid black;width:5%;border-top:1px solid black">
                           
                                    جنس
                        </td>
                                    <td style="width:20%;border-top:1px solid black;border-bottom:1px solid black;">
                                    نارینه / مرد
                                        @if($review->gender == 1)
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                    </td>
                                  
                                    <td style="width:20%;border-top:1px solid black;border-bottom:1px solid black;">
                                    ښځینه / زن  
                                        @if($review->gender == 2)
                                        <img src="{{public_path()}}/img/checked.jpg">
                                        @else
                                        <img src="{{public_path()}}/img/unchecked.jpg">
                                        @endif
                                    </td>
                            
                    
                 
                                    <td
                                        style="background-color:#D1D2D4;border-left:1px solid black;border-right:1px solid black; border-top:1px solid black;width:3.3%;border-bottom:1px solid black;">
                                        27 </td>
                                    <td style="border-top:1px solid black;border-bottom:1px solid black;">
                                        د رایې ورکولو ځای / محل رای دهی:
                                    </td>
                                    <td style="border-top:1px solid black;border-bottom:1px solid black;border-left:1px solid black">
                                        {{ $review->voting_place}}
                              
                                     </td>
                                 </tr>
                            </table>
                    <table width="100%" cellpadding="0px" cellspacing="0px">
                    <tr>
                        <td style="background-color:#D1D2D4;border:1px solid black;width:4%;border-top:0px">28 </td>
                        <td colspan="4" style="border-bottom:1px solid black;border-left:1px solid black">
                            <table width="100%" style="font-size:90%">
                                <tr>
                                    <td colspan="2">
                                        <strong>
                                            د کاغذی تذکرې معلومات / معلومات تذکره قاغذی
                                        </strong>
                                    </td>
                                    <td>ټوک او کال / جلد و سال </td>
                                    <td>
                                        د پاڼې ګنه / شماره صفحه
                                    </td>
                                    <td> د ثبت ګنه / شماره ثبت</td>
                                    <td>
                                        د صکوکو شمېره / شماره صکوک
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">

                                    </td>
                                    <td>
                                        [__{{$review->paper_id_volume}}__]
                                    </td>
                                    <td>
                                        [__{{$review->paper_id_page}}__]
                                    </td>
                                    <td>
                                        [__{{$review->paper_id_registration}}__]
                                    </td>
                                    <td>
                                        [__{{$review->paper_id_sokok}}__]
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        د صدور ځای او د صدور نېټه / محل صدور و تاریخ صدور:
                                    </td>
                                    <td>
                                        ولایت
                                    </td>
                                    <td>
                                        ولسوالی / ناحیه
                                    </td>
                                    <td>
                                        ورځ / روز
                                    </td>
                                    <td>
                                        میاشت / ماه
                                    </td>
                                    <td>
                                        کال / سال
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                    </td>
                                    <td>
                                        [_______{{$review->original_residence_province}}_________]
                                    </td>
                                    <td>
                                        [____{{$review->original_residence_district}}_____]
                                    </td>
                                    <td>
                                        [_____{{$review->id_issue_date_day}}____]
                                    </td>
                                    <td>
                                        [_____{{$review->id_issue_date_month}}____]
                                    </td>
                                    <td>
                                        [_____{{$review->id_issue_date_year}}____]
                                    </td>
                                </tr>
                            </table>
                        </td>

                    </tr>

                </table>
                @if($loadCss)
                <table cellpadding="5px" width="100%">

                    <tr>
                        <td>
                            زه <u> &nbsp;{{ $review->name }} {{ $review->surname }} </u> تصدق کوم چی په دې فورمه کې لیکل
                            شوي معلومات سم او کره دي.‌ که چېرته پورتني معلومات غلط ثابت شي ، هر ډول قانوني چلند منم.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            اینجانب <u> &nbsp;{{ $review->name }} {{ $review->surname }} </u> تصدیق می کنم که معلومات
                            مندرج این فورم صحت و موثق می باشد. در صورتیکه معلومات فوق غلط ثابت گردد ، هر نوع عواقب
                            قانونی را می پذیرم. </td>
                    </tr>
                </table>

                <table width="100%" cellspacing="8px">
                    <tr>
                        <td colspan="2"
                            style="border:1px solid black;padding:10px;font-size:90%;height:100px;vertical-align:top;text-align:center">
                            د شخص لاسلیک یا د ګوتي نښه / امضا یا نشان انگشت شخص
                            <div style="float:left">
                                <strong> نیټه / تاریخ : ........ /....../ .........</strong>
                            </div>
                        </td>
                        <td colspan="2"
                            style="border:1px solid black;padding:10px;font-size:90%;height:100px;vertical-align:top;text-align:center">
                            د کورنی مشر لاسلیک یا د ګوتې نښه / امضا یا نشان انگشت رییس فامیل

                            <div style="float:left">
                                <strong> نیټه / تاریخ : ........ /....../ .........</strong>
                            </div>
                        </td>
                    </tr>


                </table>
                @endif
                <div style="page-break-before:always;"></div>
                @if($loadCss)
                <table width="100%" cellspacing="8px">
                    <tr>
                        <td style="background-color: #D1D2D4;font-size:60%">
                            <h2 style="margin:0px;padding:0px;text-align:center"> د هویت تصدیق کوونکي | تصدیق کنندگان
                                هویت</h2>
                            <p style="text-align:center">
                                که کاغذي تذکره لرۍ، د فورم دا برخه می ډکوۍ / اگر تذکره کاغذی دارید ، این بخش فورم را
                                خانه پری نه نمائید
                            </p>
                            <ul>
                                <li>
                                    د ۱۸ کلونو څخه ټیټ عمر غوښتونکو د هویت تصدیق د هغوی والدین او که له ۱۸ کلونو څخه یې
                                    عمر پورته وي،بیایي دوه تنه افغانان د هویت تصدیق وکړي چی یې باید د دولت برحاله
                                    کارکوونکی یا د ګذر وکیل او یا هم د کلي ملک وي. بل تصدیق کوونکی دې
                                    عادي وګړی وی چې تذکره ولري. د تصدیق کوونکو د اړیکشمېرو لیکل، د تذکرو او هویت کارت
                                    کاپی نښلول او همدارنګه د غوښتونکو د اصولي اقاربو لکه د پلار یا ورور د تذکرې کاپي
                                    نښلول حتمي دي.
                                </li>
                                <li>

                                    هویت متقاضی پایین تر از سن ۱۸ را والدین شان و هویت متقاضی بالاتر از سن ۱۸ را دو تن
                                    افغان تصدیق نمایند که یکی آن کارمند برحال دولت یا وکیل گذر و یا ملک قریه باشد. فرد
                                    دیگر تصدیق کننده، شهروند عادی بوده که دارای تذکره باشد. درج شماره های تماس، ضمیمه
                                    نمودن کاپی تذکره و کارت هویت تصدیق کنندگان و همچنان ضمیمه نمودن کاپی تذکره اقارب
                                    اصولی متقاضی مانند پدر یا برادر حتمی میباشد.
                                </li>
                            </ul>
                        </td>

                    </tr>

                </table>
                @endif

                <table width="100%" cellspacing="8px">
                    <tr>
                        <td style="border:1px solid black;padding:10px;text-align:center;background-color:#D1D2D4;">
                            لومړی تصدیق کوونکی / تصدیق
                            کننده اول</td>

                        <td style="border:1px solid black;padding:10px;text-align:center;background-color:#D1D2D4;">
                            دویم تصدیق کوونکی / تصدیق
                            کننده دوم</td>

                    </tr>
                    <tr>
                        <td>
                            <table width="100%" style="font-size:90%">
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3"> نوم / نام: <span
                                            class="customValue">{{$review->first_gurantor_name}} </span></td>

                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3">
                                        <span>
                                            تخلص:
                                        </span>
                                        <span class="customValue">{{$review->first_gurantor_surname}}</span>
                                    </td>

                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3">
                                        <span>
                                            د پلار نوم / نام پدر:
                                        </span>
                                        <span class="customValue">{{$review->first_gurantor_father_name}}</span>
                                    </td>

                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3">
                                        <span> د پلار تخلص/ تخلص پدر:
                                        </span>
                                        <span class="customValue">{{$review->first_gurantor_father_surname}} </span>
                                    </td>

                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;background-color:#D1D2D4;"
                                        colspan="3">
                                        د کاغذي یا الکترونیکي تذکرې معلومات / معلومات تذکره کاغذی یا الکترونیکی
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3">
                                        <table width="100%" style="font-size:80%">
                                            <tr>
                                                <td style="text-align:center">ټوک او کال / جلد و سال </td>
                                                <td style="text-align:center"> د پاڼې ګڼه / شماره صفحه </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:center">
                                                    [___{{$review->first_gurantor_paper_id_volume}} /
                                                    {{$review->first_gurantor_paper_id_year}}___]
                                                </td>
                                                <td style="text-align:center">
                                                    [______{{$review->first_gurantor_paper_id_page}}_______]
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:center"> د ثبت ګنه / شماره ثبت</td>
                                                <td style="text-align:center">د صکوکو شمېره / شماره صکوک</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:center">
                                                    [___{{$review->first_gurantor_paper_id_registration}}___]</td>
                                                <td style="text-align:center">
                                                    [___{{$review->first_gurantor_paper_id_sokok}}___]</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="border-top:1px solid black">
                                                    د الکترونیکي تذکرې شمیره / شماره تذکره الکترونیکی <br>
                                                    <strong>{{$review->first_gurantor_digital_id}}</strong>
                                                </td>
                                            <tr>
                                        </table>
                                    </td>

                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3">
                                        <table width="100%">
                                            <tr>
                                                <td> د تذکرې صدور ځای / </td>
                                                <td> ولایت
                                                    <span
                                                        class="customValue">{{$review->first_gurantor_id_issue_province}}</span>
                                                </td>
                                                <td>ولسوالی
                                                    <span
                                                        class="customValue">{{$review->first_gurantor_id_issue_district}}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    د صدور نېټه / تاریخ صدور
                                                </td>
                                                <td>
                                                    <span class="customValue">
                                                        {{$review->first_gurantor_id_issue_date_day}} /
                                                        {{$review->first_gurantor_id_issue_date_month}} /
                                                        {{$review->first_gurantor_id_issue_date_year}}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="border:1px solid black;padding:5px;width:50%">د اړیکې شمېرې / شماره های
                                        تماس
                                    </td>
                                    <td style="border:1px solid black;padding:5px;" colspan="2">
                                        <span class="customValue"> {{$review->first_gurantor_contact_no}}</span>
                                    </td>

                                </tr>
                                <tr>
                                    <td colspan="3" style="border:1px solid black">
                                        زه د {{$review->name}} {{$review->surname}} د {{$review->father_name}}
                                        {{$review->father_surname}} زوی /لور د هویت تصدیق کوم.
                                        <br>
                                        از هویت {{$review->name}} {{$review->surname}} ولد / بنت
                                        {{$review->father_name}} {{$review->father_surname}} تصدیق می کنم.

                                        <br><br>
                                        لاسلیک یا د ګوتې نښه / امضا یا نشان انگشت
                                    </td>
                                </tr>



                            </table>
                        </td>
                        <td>
                            <table width="100%" style="font-size:90%">
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3"> نوم / نام: <span
                                            class="customValue">{{$review->second_gurantor_name}} </span></td>

                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3">
                                        <span>
                                            تخلص:
                                        </span>
                                        <span class="customValue">{{$review->second_gurantor_surname}}</span>
                                    </td>

                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3">
                                        <span>
                                            د پلار نوم / نام پدر:
                                        </span>
                                        <span class="customValue">{{$review->second_gurantor_father_name}}</span>
                                    </td>

                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3">
                                        <span> د پلار تخلص/ تخلص پدر:
                                        </span>
                                        <span class="customValue">{{$review->second_gurantor_father_surname}} </span>
                                    </td>

                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;background-color:#D1D2D4;"
                                        colspan="3">
                                        د کاغذي یا الکترونیکي تذکرې معلومات / معلومات تذکره کاغذی یا الکترونیکی
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3">
                                        <table width="100%" style="font-size:80%">
                                            <tr>
                                                <td style="text-align:center">ټوک او کال / جلد و سال </td>
                                                <td style="text-align:center"> د پاڼې ګڼه / شماره صفحه </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:center">
                                                    [___{{$review->second_gurantor_paper_id_volume}}/{{$review->first_gurantor_paper_id_year}}___]
                                                </td>
                                                <td style="text-align:center">
                                                    [______{{$review->second_gurantor_paper_id_page}}_______]
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:center"> د ثبت ګنه / شماره ثبت</td>
                                                <td style="text-align:center">د صکوکو شمېره / شماره صکوک</td>
                                            </tr>
                                            <tr>
                                                <td style="text-align:center">
                                                    [___{{$review->second_gurantor_paper_id_registration}}___]</td>
                                                <td style="text-align:center">
                                                    [___{{$review->second_gurantor_paper_id_sokok}}___]</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="border-top:1px solid black">
                                                    د الکترونیکي تذکرې شمیره / شماره تذکره الکترونیکی <br>
                                                    <strong>{{$review->second_gurantor_digital_id}}</strong>
                                                </td>
                                            <tr>
                                        </table>
                                    </td>

                                </tr>
                                <tr>
                                    <td style="border:1px solid black;padding:5px;" colspan="3">
                                        <table width="100%">
                                            <tr>
                                                <td> د تذکرې صدور ځای / </td>
                                                <td> ولایت
                                                    <span
                                                        class="customValue">{{$review->second_gurantor_id_issue_province}}</span>
                                                </td>
                                                <td>ولسوالی
                                                    <span
                                                        class="customValue">{{$review->second_gurantor_id_issue_district}}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    د صدور نېټه / تاریخ صدور
                                                </td>
                                                <td>
                                                    <span class="customValue">
                                                        {{$review->second_gurantor_id_issue_date_day}} /
                                                        {{$review->second_gurantor_id_issue_date_month}} /
                                                        {{$review->second_gurantor_id_issue_date_year}}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="border:1px solid black;padding:5px;width:50%">د اړیکې شمېرې / شماره های
                                        تماس
                                    </td>
                                    <td style="border:1px solid black;padding:5px;" colspan="2">
                                        <span class="customValue"> {{$review->second_gurantor_contact_no}}</span>
                                    </td>

                                </tr>
                                <tr>
                                    <td colspan="3" style="border:1px solid black">
                                        زه د {{$review->name}} {{$review->surname}} د {{$review->father_name}}
                                        {{$review->father_surname}} زوی /لور د هویت تصدیق کوم.
                                        <br>
                                        از هویت {{$review->name}} {{$review->surname}} ولد / بنت
                                        {{$review->father_name}} {{$review->father_surname}} تصدیق می کنم.

                                        <br><br>
                                        لاسلیک یا د ګوتې نښه / امضا یا نشان انگشت
                                    </td>
                                </tr>



                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="2" style="border:1px solid black">
                            <table width="100%">
                                <tr>
                                    <td width="70%">
                                        د اړوندې مرجه له لوري د تصدیق کوونکی ( د دولت کارکوونکی / ګذر وکیل / کلي ملک) د
                                        برحالی تاییدي
                                        <br>
                                        تائیدی از برحالی تصدیق کننده ( کارمند دولت / وکیل گذر / ملک قریه ) توسط مرجع
                                        مربوطه
                                        <br>
                                        <div style="border-bottom:1px dashed black"></div> <br>
                                        <div style="border-bottom:1px dashed black"></div>
                                    </td>
                                    <td>
                                        لاسلیک او ټاپه / امضا و مهر
                                    </td>
                                </tr>
                            </table>


                        </td>
                    </tr>
                </table>

                @if($loadCss)
                <table width="100%" cellspacing="8px">
                    <tr>
                        <td style="background-color: #D1D2D4;font-weight:Bolder;text-align:center" colspan="2">
                            <h2 style="margin:0px;padding:0px;"> د لاندې برخې ډکول ادارې پورې اړه لري / خانه پری بخش ذیل
                                مربوط اداره می باشد</h2>

                        </td>

                    </tr>
                    <tr>
                        <td style="border:1px solid black;height:80px;width:40%;font-size:90%">
                            د هویت پېژندنې د کار کوونکي نوم او لاسلیک / اسم و امضای کارمند تثبیت هویت
                        </td>
                        <td rowspan="2" style="text-align:center;border:1px solid black;padding:10px">
                            <h4> د کورنی فورمې شمېره / شماره فورم فامیلی</h4>
                            <table width="100%">
                                <tr>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                </tr>
                            </table>

                            <h4> د الکترونیکي تذکرې شمېره / شماره تذکره الکترونیکی</h4>
                            <table width="100%">
                            <tr>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                <td style="border:1px solid black;padding:5px;width:30px;height:40px"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="border:1px solid black;height:80px;width:60%">
                            د هویت پېژندنې د ناظر نوم او لاسلیک / اسم و امضای ناظر تثبیت هویت
                        </td>

                    </tr>

                </table>
                @endif




@if($loadCss)
</body> 
@endif
