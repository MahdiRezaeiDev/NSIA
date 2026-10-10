<table width="100%" cellpadding="0px" cellspacing="0px" >
            <tr>
                <td  rowspan="2" style="width:80">
                  <img src="{{public_path()}}/img/logo_black.jpg" width="140px" >
                </td>
               
                <td style="text-align:center">
                   <span>جمهوری اسلامی افغانستان</span> <br>
                    <span>ریاست عمومی ثبت احوال نفوس</span>
                </td>
              
       
              
                <td style="text-align:center">
                  <span>دافغانستان اسلامي جمهوریت</span><br>
                    <span> د نفوسو د احوال ثبتول لوی ریاست </span>
                </td>
                <td rowspan="2" style="width:80">
                     <img src="{{public_path()}}/img/afg_logo.jpg" width="80" height="80">
                </td>
              
                
            </tr>
            <tr>
              
                <td colspan="2" style="text-align:center">
                    <h6>
               دانفرادي معلوماتو د ثبت
          د تصدیق رسید/ رسید تصدیق ثبت معلومات انفرادی
                    </h6>
                </td>
                
                <td></td>
            <tr>
    </table>
    <div style="padding: 0 5%;">
        <div>
          <table class="tftable" border="1">
            <tr>
              <th colspan="4">شخصی معلومات/ معلومات شخصی</th>
            </tr>
            <tr>
              <td></td>
              <td>د کورنی فورمی شمیره/ شماره فورمه خانواده ګی</td>
              <td>{{$review->name}}</td>
              <td>نوم/ نام</td>
            </tr>
            <tr>
              <td></td>
              <td>د الکترونیکی تذکري شمیره/ شماره تذکره الکترونیکی</td>
              <td>{{$review->surname}}</td>
              <td>کورنی نوم/ نام خانواده گی</td>
            </tr>
            <tr>
              <td>{{$review->formatLocalLanguages($review->local_language_knowledge)}}</td>
              <td>په نورو ملی ژبو باندی پوهیدل/ اشنایی با سایر زبان های ملی</td>
              <td>{{$review->english_name}} {{$review->english_surname}}</td>
              <td>انګلیسی نوم/ نام انگلیسی</td>
            </tr>
            <tr>
              <td>{{$review->formatForeignLanguages($review->foreign_language_knowledge)}}</td>
              <td>په بهرنیو ژبو باندي پوهیدل/ اشنایی با زبان های خارجی</td>
              <td>{{$review->father_name}}</td>
              <td>د پلار نوم/ ولد</td>
            </tr>
            <tr>
              <td>{{$review->kochi_spring_residence_province}} {{$review->kochi_spring_residence_district}}</td>
              <td>
                د کوچیانو د اوړي هستوګنځی/ محل بودوباش تابستانی برای کوچی ها
              </td>
              <td>{{$review->mother_name}}</td>
              <td>د مور نوم/ نام مادر</td>
            </tr>
            <tr>
              <td>{{$review->kochi_winter_residence_province}} {{$review->kochi_winter_residence_district}} </td>
              <td>د کوچیانو ژمنی هستوګنځی/ محل بودوباش زمستانی برای کوچی ها</td>
              <td>{{$review->grand_father_name}}</td>
              <td>د نیکه نوم/ ولدیت</td>
            </tr>
            <tr>
              <td>{{$review->getMaritalStatusText()}}</td>
              <td>مدني حالت/ حالت مدنی</td>
              <td>
                {{$review->getGenderText()}}
              </td>
              <td>جنس/ جنسیت</td>
            </tr>
            <tr>
              <td>{{$review->occupation}}</td>
              <td>وظیفه/ مسلک/ شغل</td>
              <td>{{$review->getBirthDayText()}}</td>
              <td>د زیږدلو نیټه/ تاریخ تولد</td>
            </tr>
            <tr>
              <td>
                @if($review->military_service)
                    او / بلی
                @else
                    نه / نخیر
                @endif
              </td>
              <td>د عسکري خدمت/ خدمت عسکری</td>
              <td>{{$review->getCountryName($review->birth_country)}} {{$review->birth_province}} {{$review->birth_district}}</td>
              <td>زیږیدلو ځای/ محل تولد</td>
            </tr>
            <tr>
              <td>{{$review->disability_type}}</td>
              <td>د معلولیت ډولونه/ انواع معلولیت</td>
              <td>{{$review->getEthnicityText($review->ethnicity)}}</td>
              <td>قوم/ قومیت</td>
            </tr>
            <tr>
              <td>
                @if($review->has_second_citizenship)
                  او/بلی
                @else
                    نه / نخیر
                @endif
              </td>
              <td>دویم تابعیت/ تابعیت دومی</td>
              <td>{{$review->getLocalLanguageText($review->mother_tongue)}}</td>
              <td>مورنی ژبه/ زبان مادری</td>
            </tr>
            <tr>
              <td>{{$review->education_level}}</td>
              <td>د زده کړي کچه/ سطح تحصیل</td>
              <td>{{$review->original_residence_province}} {{$review->original_residence_district}} {{$review->original_residence_village}}</td>
              <td>اصلی هستوګنڅی/ سکونت اصلی</td>
            </tr>
            <tr>
              <td>{{$review->blood_group}}</td>
              <td>د ویني ګروپ/ گروپ خون</td>
              <td>{{$review->current_residence_province}} {{$review->current_residence_district}} {{$review->current_residence_village}}</td>
              <td>اوسنی هستوګنڅی/ سکونت فعلی</td>
            </tr>
            <tr>
              <td>{{$review->religion_sector}}</td>
              <td>مذهب</td>
              <td>{{$review->religion}}</td>
              <td>دین</td>
            </tr>
            <tr>
              <td colspan="2">{{$review->voting_place}}</td>
              <td colspan="2">د راي ورکولو ځای/ محل رای دهی</td>
            </tr>
            <tr>
              <td colspan="4" style="font-weight:bold">
                د کاغذی تذکري معلومات/ معلومات تذکره کاغذی
              </td>
            </tr>
            <tr>
              <td>{{$review->paper_id_registration}}</td>
              <td>د ثبت ګڼه/ شماره ثبت</td>
              <td>{{$review->paper_id_sokok}}</td>
              <td>د صکوک شمیره/ شمره صکوک</td>
            </tr>
            <tr>
              <td>
              {{$review->id_issue_date_year}}/{{$review->id_issue_date_month}}/{{$review->id_issue_date_day}}
              </td>
              <td>د صدور نیټه/ تاریخ صدور</td>
              <td>{{$review->paper_id_volume}}</td>
              <td>د ټوک ګڼه/ شماره جلد</td>
            </tr>
            <tr>
              <td>{{$review->original_residence_province}} {{$review->original_residence_district}}</td>
              <td>د صدور ځای/ محل صدور</td>
              <td>{{$review->paper_id_page}}</td>
              <td>د پانی ګڼه/ شماره صفحه</td>
            </tr>
          </table>
        </div>
        <div style="margin-top:10px;">
          <table class="tftable" border="1">
            <tr>
              <th colspan="2">د نوم ثبتولو د مرکز / معلومات مرکز ثبت نام</th>
            </tr>
            <tr>
              <td></td>
              <td>د پاڼی ګنه/ شماره صفحه</td>
            </tr>
            <tr>
              <td></td>
              <td>د نوم ثبتولو نیټه/ تاریخ ثبت نام</td>
            </tr>
            <tr>
              <td></td>
              <td>د نوم ثبتولو کارکوونکی/ مامور ثبت نام</td>
            </tr>
            <tr>
              <td></td>
              <td>د ثبتولو مشر کارکوونکی/ مامور ارشد ثبت نام</td>
            </tr>
            <tr>
              <td></td>
              <td>د نوم ثبتولو د تیم مشر/ سر تیم ثبت نام</td>
            </tr>
          </table>
        </div>
        <div style="margin-top:10px;">
          <table class="tftable" border="1">
            <tr>
              <th>یادونه</th>
              <th>یادداشت</th>
            </tr>
            <tr>
              <td>
                لطفا معلومات فوق را با دقت بخوانید. این معلوماتی است که در مورد
                شما در سیستم تذکره الکترونیکی ثبت شده است. چنانچه معلومات فوق
                .مورد تائید شما باشد , در زیر امضا کنید
              </td>
              <td>
                مهربانی وکړی او پورته معلومات په غور سره ولولی دا هغه معلومات دي
                چی ستاسو په اړه د الکترونیکی تذکري په سیستم کی ثبت شوي ديږ که
                .پورته معلومات ستاسی د تائید وړ وي لاندی لاسلیک وکړي
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 20px;">
                -------------------------------------------:د درخواست کوونکی
                لاسیک/ امضای درخواست کننده
              </td>
            </tr>
          </table>
        </div>
      </div>