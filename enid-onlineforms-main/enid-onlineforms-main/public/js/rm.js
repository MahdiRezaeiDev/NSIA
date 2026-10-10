function addZeroPadding(num){
 
    if(num.length == 1){
        return '0'+num;
    }
    return num;
}
var RM_MEMBER =function(onlineData,index){
    var d = {};
 
        d.data = {
            givNm:onlineData.name,
            surnm:onlineData.surname,
            fthrGivNm:onlineData.father_name,
            fthrNm:onlineData.father_surname,
            gfthrGivNm:onlineData.grand_father_name,
            gfthrNm:onlineData.grand_father_surname,
            bthDd:onlineData.birthday_year+"-"+addZeroPadding(onlineData.birthday_month)+"-"+addZeroPadding(onlineData.birthday_day),
            bthDds:onlineData.birthday_year+"-"+addZeroPadding(onlineData.birthday_month)+"-"+addZeroPadding(onlineData.birthday_day),
            bthDdJ:onlineData.birthday_year+"-"+addZeroPadding(onlineData.birthday_month)+"-"+addZeroPadding(onlineData.birthday_day),
            cal:'j',
            curtAdDiv:'N',
            recodeNum:"recodeNum"+index,
            curtAdCd:onlineData.current_residence.district_code,
            curtAdCdNm:onlineData.current_residence.province+"/"+onlineData.current_residence.district,
            preAdCd:onlineData.current_residence.province+"/"+onlineData.current_residence.district,
            curtAdDtlCts:onlineData.current_residence.village,
            curtAdDtlCtd:onlineData.current_residence.village,
            curtAdCds:onlineData.current_residence.district_code,
            curtAdNms:onlineData.current_residence.district,
            othrRls:'',
            rsdtNos:'',
            rsdtSeqNos:'',
            fthrRsdtSeqNos:'',
            gfthrRsdtSeqNos:'',
            fthrTyes:'T',
            gfthrTyes:'T',
            fthrRsdNos:'',
            gfthrRsdtSeqNos:'',
            gfthrRsdtNos:'',
            hsbdRsdtSeqNos:'',
            hsbdTyes:'',
            hsbdRsdtNos:'',
            fthrOldCrdNos2:'',
            fthrOldCrdNos3:'',
            fthrOldCrdNos4:'',
            gfthrOldCrdNos1:'',
            gfthrOldCrdNos2:'',
            gfthrOldCrdNos3:'',
            gfthrOldCrdNos4:'',
            spusOldCrdNos1:'',
            spusOldCrdNos2:'',
            spusOldCrdNos3:'',
            spusOldCrdNos4:'',
            vrfrYns:'N',
            curtAdNatCds:'',
            curtAdDtlCtFs:'',
            oldCrdIsuceDds:'',
            oldCrdIsucePlceCds:'',
            oldCrdIsucePlceCdNms:''
        
         
        };
    
    d.setPaperId= function(data){
        d.data['oldCrdNo1'] ='';
        d.data['oldCrdNo2'] ='';
        d.data['oldCrdNo3'] ='';
        d.data['oldCrdNo4'] ='';
        if(data.paper_id_volume!=null){
            d.data['oldCrdNo1'] = data.paper_id_volume; 
        }
        if(data.paper_id_page!=null){
            d.data['oldCrdNo2'] = data.paper_id_page; 
        }
        if(data.paper_id_registration!=null){
            d.data['oldCrdNo3'] = data.paper_id_registration; 
        }
        if(data.paper_id_sokok!=null){
            d.data['oldCrdNo4'] = data.paper_id_sokok; 
        }
        d.data['oldCrdIsuceDd'] ='';
        if(data.id_issue_date_day!=null){
            d.data['oldCrdIsuceDd'] = data.id_issue_date_year+"-"+addZeroPadding(data.id_issue_date_month)+"-"+addZeroPadding(data.id_issue_date_day); 
        }
        d.data['oldCrdIsucePlceCdNm']='';
        d.data['oldCrdIsucePlceCdNms']='';
        if(data.id_issue_province!=null){
            d.data['oldCrdIsucePlceCdNm'] = data.id_issue_province +"/"+data.id_issue_district;
            d.data['oldCrdIsucePlceCdNms'] = data.id_issue_province +"/"+data.id_issue_district;
        }
       
    }
    d.setPartnerName=function(name){
        if(name != null){
            d.data['hsbdNm'] = name;
            
        }else{
            d.data['hsbdNm'] = '';
        }
      
    }
    d.setLivingStatus=function(status){
        d.data['deadYn']='N';
        d.data['frngrYn']='N';
        d.data['frngrYns']='N';
        if(status === 'وفات'){
            d.data['deadYn']='Y';
            d.data['deadYns']='Y';
        }   
        if(status == 'بهرنی / خارجی'){
            d.data['frngrYn']='Y';
            d.data['frngrYns']='Y';
        }

    }
    d.setGender=function(gender){
        if(gender == 'نارینه / مرد'){
            d.data['gdrCd'] = '1';
            d.data['gdrCds'] = '1';
            d.data['gdrCdNm'] = 'مذکر';
        }else{
            d.data['gdrCd'] = '2';
            d.data['gdrCds'] = '2';
            d.data['gdrCdNm'] = 'مونث';
        }
    }
    d.setRelationship=function(rel){
        var value = '';
        if( rel == 'خودم' || rel== 'خپل ځان'){
            value = '1';
        }
        if( rel == 'خانم' || rel== 'ښځه'){
            value = '3';
        }
        if( rel == 'پسر' || rel== 'زوی'){
            value = '4';
        }
        if( rel == 'دختر' || rel== 'لور'){
            value = '5';
        }
        if( rel == 'پدر' || rel== 'پلار'){
            value = '6';
        }
        if( rel == 'مادر' || rel== 'مور'){
            value = '7';
        }
        if( rel == 'ورور' || rel== 'برادر'){
            value = '8';
        }
        if( rel == 'خور' || rel== 'خواهر'){
            value = '9';
        }
        if( rel == 'خور' || rel== 'پدر کلان'){
            value = '10';
        }
        if(rel.length > 0 && value ==''){
            value = '18';
        }
        d.data['rlCds'] = value;
        d.data['rlCd'] = value;
        d.data['rlCdNm'] = rel;

    }
    d.setPaperId(onlineData);
    d.setPartnerName(onlineData.partner_name);
    d.setLivingStatus(onlineData.living_status);
    d.setGender(onlineData.gender);
    d.setRelationship(onlineData.relationship_with_head_of_family);
    return d;
}