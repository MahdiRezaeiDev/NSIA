<!DOCTYPE html>
<html>
  <head>
    <title>Individual Registration Confirmation Receipt</title>
    <style type="text/css">
      .tftable {
        font-size: 10px;
        width: 100%;
        border-width: 1px;
        border-collapse: collapse;
      }
      .tftable th {
        font-size: 10px;
        border-width: 1px;
        padding: 3px;
        border-style: solid;
        text-align: right;
      }
      .tftable td {
        font-size: 10px;
        border-width: 1px;
        padding: 3px;
        border-style: solid;
        text-align: right;
      }
    </style>
  </head>

  <body  >
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
                
                    <h4>
                       د کورنۍ دمعلوماتو دثبت د
                        تصدیق رسید / رسید تصدیق ثبت معلومات فامیلی
                    </h4>
                </td>
                
                <td></td>
            <tr>
    </table>
    <div style="text-align: center; border:1px solid ; padding: 5px;">
    
    
      <div >
        <div>
          <table class="tftable" border="1" width="100%">
            <tr>
          
              <th colspan="10"></th>
              <th colspan="2">
                د کورنی پاڼی شمیره/ شماره فورم خانواده گی
              </th>
            
              
            </tr>
            <tr>
           
       
              <td colspan="12" style="font-weight: bold;">
                د کورنی د مشر معلومات/ معلومات رئیس خانواده
              </td>
           
            </tr>
            <tr>
             
              <td colspan="10">{{$headOfFamily->name}}  {{$headOfFamily->surname}}</td>
              <td colspan="2">د کورنی د مشر نوم/ اسم رئیس خانواده</td>
             
            </tr>
            <tr>
              
    
              <td colspan="3">
                  {{$headOfFamily->original_residence_province}}/{{$headOfFamily->original_residence_district}} {{$headOfFamily->original_residence_village}}
            </td>
              <td colspan="3">اصلی هستوګنڅی/ سکونت اصلی</td>
              <td colspan="3"> {{$headOfFamily->father_name}} {{$headOfFamily->father_surname}}</td>
              <td colspan="3">د پلار نوم/ ولد</td>
       
            </tr>
            <tr>
              <td colspan="3">
              {{$headOfFamily->current_residence_province}}/{{$headOfFamily->current_residence_district}} {{$headOfFamily->current_residence_village}}
              </td>
              <td colspan="3">اوسنی هستوګنڅی/ سکونت فعلی</td>
              <td colspan="3">{{$headOfFamily->grand_father_name}} {{$headOfFamily->grand_father_surname}}</td>
              <td colspan="3">د نیکه نوم/ ولدیت</td>
            </tr>
            <tr>
              <td colspan="3" style="border:0px!important">
                    {{$headOfFamily->paper_id_year}}  {{$headOfFamily->paper_id_volume}}
              </td>
              <td colspan="3" style="border:0px!important">
                    {{$headOfFamily->paper_id_page}}  
              </td>
              <td colspan="2" style="border:0px!important">
                    {{$headOfFamily->paper_id_registration}}  
              </td>
              <td colspan="2" style="border:0px!important">
                    {{$headOfFamily->paper_id_sokok}}  
              </td>
              <td colspan="2">د کاغذي تذکرې شمیره/ شماره تذکره کاغذی</td>
            </tr>
            <tr>
              <td colspan="3">{{$headOfFamily->id_issue_date_day}}/{{$headOfFamily->id_issue_date_month}}/{{$headOfFamily->id_issue_date_year}}</td>
              <td colspan="3">د ورکړی نیټه/ تاریخ صدور</td>
              <td colspan="3"> {{$headOfFamily->original_residence_province}}/{{$headOfFamily->original_residence_district}} {{$headOfFamily->original_residence_village}}</td>
              <td colspan="3">د ورکړی ځای/ محل صدور</td>
            </tr>
            <tr>
              <th colspan="12">
                د نوموړی د کورنی د غړو شخص د غړو معلومات/ معلومات اعضای فامیل
                شخص متذکره
              </th>
            </tr>
            <tr>
              <td>بهرنی / خارجی</td>
              <td>مړشوی / فوت شده</td>
              <td>د کاغذی تذکري شمیره/ شماره تذکره کاغذی</td>
              <td>جنس/ جنسیت</td>
              <td>اوسنی هستوګنڅی/ سکونت فعلی</td>
              <td>د زیږیدلو نیټه/ تاریخ تولد</td>
              <td>د کورنی له مشر سره اړیکه/ ارتباط با رئیس خانواده</td>
              <td>د نیکه نوم/ ولدیت</td>
              <td>د پلار نوم/ ولد</td>
              <td>تخلص یا کورنی نوم/ تخلص یا نام خانواده گی</td>
              <td>د کورنی د غړو نومونه/ اسمای اعضای خانواده</td>
              <td>شمیره/ شماره</td>
            </tr>
            @foreach( $members as $index=>$i )
            <tr>
              <td>
                @if($i->has_second_citizenship)
                    بلی
                @endif
              </td>
              <td>
                @if($i->living_status == 2)
                  بلی
                @else
                  نخیر
                @endif
              </td>
              <td>
                  {{$i->paper_id_year}}  {{$i->paper_id_volume}} <br>
                  {{$i->paper_id_page}}  <br>
                  {{$i->paper_id_registration}}<br>
                  {{$i->paper_sokok}} 
              </td>
              <td>
                @if($i->gender==1)
                مرد
                @else
                زن
                @endif
              </td>
              <td>{{$i->current_residence_province}} {{$i->current_residence_district}}  {{$i->current_residence_village}}</td>
              <td>
                  @if($i->birthday_day)
                        {{$i->birthday_year}} / {{$i->birthday_month}} /{{$i->birthday_day}} <br>
                        {{$i->birthdayToGeorgian()}}
                  @endif
              </td>
              <td>{{$i->getRelationshipDescription()}}</td>
              <td>{{$i->grand_father_name}} {{$i->grand_father_surname}}</td>
              <td>{{$i->father_name}} {{$i->father_surname}}</td>
              <td>{{$i->surname}}</td>
              <td>{{$i->name}}</td>
              <td>{{$index+1}}</td>
            </tr>
            @endforeach
           
            <tr>
              <th colspan="6">
                یاداشت: لطفا معلومات فوق را با دقت بخوانید. این معلوماتی است که
                در مورد شما در سیستم تذکره الکترونیکی ثبت شده است
              </th>
              <th colspan="6">
                یادونه: مهربانی وکړی ، پورته معلومات په غور سره ولولی. دا هغه
                معلومات دۍ چی ستاسو په اړه د الکترونیکی تذکري په سیستم کی ثبت
                شوی دی
              </th>
            </tr>
            <tr>
              <th colspan="12" style="padding: 20px;">
                ---------------------------------------------------د نوم لیکنی
                کارکوونکی لاسلیک/ امضای مامور ثبت نام
              </th>
            </tr>
          </table>
        </div>
     
      </div>
    </div>
