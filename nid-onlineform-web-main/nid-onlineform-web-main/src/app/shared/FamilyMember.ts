import {FormField} from "./FormField";
import {FieldOption} from "./FieldOption";
import {Api} from '../services/Api';
import * as Jalaali from "jalaali-js";
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { ValidIssueDateValidator } from '../validations/ValidIssueDate';
import { FileUploader ,FileUploaderOptions, FileItem} from 'ng2-file-upload';
import * as moment from 'moment';
import {Md5} from 'ts-md5/dist/md5';
import { isValidJalaliDate, jalaliNumber } from './JalaliDate';
export class Uploader extends FileUploader {
    public errors:any={};
    onAfterAddingFile(file: any) {
      file.withCredentials = false;
    }

    public getUploadedItems(): any[] {
        return this.queue.filter((item) => item.isUploaded);
    }

    public isInQueue(name){
        for(let item of this.queue){
            if(item.file.name == name){
                return true;
            }
        }

        return false;
    }
   
  }
export class FamilyMember{
    public collapse=false;
    public fields=[];
    public relationships=[];
    public uploader:Uploader;
    public form:FormGroup;
    public files:any=[];

    constructor(private api:Api,data?){
        this.uploader= new Uploader({
            url: this.api.endpoint+"/uploadFile",
        });
        this.fields =[
                    new FormField('relationship_with_head_of_family','','select',true,"").setLanguageOption(this.api,'relationships').setColumnWidth(6),
                    new FormField('token','','hidden',false,1),
                    new FormField('status','','hidden',false,1),
                    new FormField('reference_no','','hidden',false),
                    new FormField('isSecondGurantorVisible','','hidden',false,false),
                    new FormField('photo','','hidden',false,''),
                    new FormField('paper_id_files','','hidden',false,''),
                    new FormField('relative_id_document','','hidden',false,''),
                    new FormField('step','','hidden',false,1).setColumnWidth(8),
                    new FormField('name','','text',true),
                    new FormField('surname','','text',false),
                    new FormField('father_name','','text',true),
                    new FormField('father_surname','','text',false),
                    new FormField('grand_father_name','','text',true).setColumnWidth(6),
                    new FormField('grand_father_surname','','text',false).setColumnWidth(6),
                  
                    new FormField('gender','','btn-group',true,'',[
                        new FieldOption("male",1).setLabel(this.api.translateService.get("male")).setIcon('fas fa-male').setColumnWidth(6),
                        new FieldOption("female",2).setLabel(this.api.translateService.get("female")).setIcon('fas fa-female').setColumnWidth(6),
                    ]).setColumnWidth(6).setTip('select_gender'),
                    
                    new FormField('living_status','','btn-group',true,1,[
                        new FieldOption("alive",1),
                        new FieldOption("death",2).setTip(this.api.translateService.get("death")),
                        new FieldOption("foreigner",3).setTip(this.api.translateService.get("non-citizen")),
                    ]).setColumnWidth(6),
                
                    new FormField('apply_for_new_id','','btn-group',false,'',[
                        new FieldOption("apply1","بلی").setColumnWidth(6).setIcon('fas fa-check-circle'),
                        new FieldOption("apply2","نخیر").setColumnWidth(6).setIcon('fas fa-times-circle')
                    ]).setColumnWidth(12),
                    new FormField('marital_status','','btn-group',true,'').setColumnWidth(12).setLanguageOption(this.api,'marital_status_options').setCondition('apply_for_new_id','بلی'),
                    new FormField('dob','','dob_auto',true,"",[
                        new FieldOption('birthday_day',"",""),
                        new FieldOption('birthday_month',"",""),
                        new FieldOption('birthday_year',"",""),
                    ]).setColumnWidth(12).setCondition('apply_for_new_id','بلی').setShowConversion(true),
                    new FormField('has_digital_id','','btn-group',true,'0',[
                        new FieldOption("yes",'1').setIcon('fas fa-check').setColumnWidth(6),
                        new FieldOption("no",'0').setIcon('fas fa-times').setColumnWidth(6),
                    ]).setCondition('relationship_with_head_of_family','1'),
                    new FormField('digital_id_number','','mask',true).setMask('0000-0000-00000').setCondition('has_digital_id','1'),

              
               
           
                    new FormField('paper_id_copy_base64','','hidden',false,'').setColumnWidth(12),
                    new FormField('mother_name','','text',true).setColumnWidth(6).setCondition('apply_for_new_id','بلی'),
                    new FormField('mother_tongue','','select',true).setColumnWidth(6).setLanguageOption(this.api,'local_languages').setCondition('apply_for_new_id','بلی'),
                    new FormField('english_name','','text',true).setColumnWidth(6).setCondition('apply_for_new_id','بلی').setLang('eng'),
                    new FormField('english_surname','','text',false).setColumnWidth(6).setCondition('apply_for_new_id','بلی').setLang('eng'),
                   
                    new FormField('birth_place','','addressAutocomplete',true,{village:"",district:"",province:"",country:"1"}).setCondition('apply_for_new_id','بلی').setColumnWidth(12),
               
                    new FormField('military_service','','btn-group',false,'',[
                        new FieldOption("yes",1).setIcon('fas fa-check-circle').setColumnWidth(6),
                        new FieldOption("no",0).setIcon('fas fa-times-circle').setColumnWidth(6),
                     
                    ]).setColumnWidth(4).setCondition('apply_for_new_id','بلی'),
                    new FormField('is_educated','','btn-group',false,'',[
                        new FieldOption("yes",1).setIcon('fas fa-check-circle').setColumnWidth(6),
                        new FieldOption("no",0).setIcon('fas fa-times-circle').setColumnWidth(6),
                     
                    ]).setColumnWidth(4).setCondition('apply_for_new_id','بلی'),
            
                    new FormField('education_level','','select',true,'',[
                        new FieldOption("educationlevel1","لومړنی زده کړرې / تعلیمات ابتدایی","لومړنی زده کړرې / تعلیمات ابتدایی"),
                        new FieldOption("educationlevel2","۱۲ پاس","۱۲ پاس"),
                        new FieldOption("educationlevel3","۱۴ پاس","۱۴ پاس"),
                        new FieldOption("educationlevel4","لیسانس","لیسانس"),
                        new FieldOption("educationlevel5","ماستر","ماستر"),
                        new FieldOption("educationlevel6","دکتورا","دکتورا"),
                     
                    ]).setColumnWidth(4).setCondition('is_educated',1).setCondition('apply_for_new_id','بلی'),
                    new FormField('original_residence','','addressAutocomplete',true,{village:"",district:"",province:"",country:"1"}).hideField('country').setCondition('apply_for_new_id','بلی').setColumnWidth(12),
                    
                    new FormField('current_residence','','addressAutocomplete',true,{village:"",district:"",province:"",country:"1"}).setCondition('apply_for_new_id','بلی').setColumnWidth(12).setCopyFrom({name:'original_residence',actions:[],applyToOtherMembers:true,showInheadOfFamily:true}),
                    new FormField('contact_numbers','','date',true,"",[
                        new FieldOption('primary_contact_no',"","").setColumnWidth(4).setMask('0000-0000-000-000').setPlaceholder("0093-0000-000-000"),
                        new FieldOption('secondary_contact_no',"","").setColumnWidth(4).setMask('0000-0000-000-000').setPlaceholder("0093-0000-000-000"),
                        new FieldOption('email_address',"","").setColumnWidth(4).setLang('eng'),
                    ]).setCondition('apply_for_new_id','بلی').setColumnWidth(12).setCopyFrom({name:'contact_numbers',actions:[],applyToOtherMembers:true,showInheadOfFamily:false}),

                  
                    new FormField('foreign_language_knowledge','','multiselect',false,'').setCondition('apply_for_new_id','بلی').setLanguageOption(this.api,'foreign_languages').setColumnWidth(6),
                    new FormField('local_language_knowledge','','multiselect',false,'').setCondition('apply_for_new_id','بلی').setLanguageOption(this.api,'local_languages').setColumnWidth(6),
                    new FormField('blood_group','','select',false,'',[   
                        new FieldOption("blood_group1","A+","A+"),
                        new FieldOption("blood_group2","A-","A-"),
                        new FieldOption("blood_group3","B+","B+"),
                        new FieldOption("blood_group4","B-","B-"),
                        new FieldOption("blood_group5","AB+","AB+"),
                        new FieldOption("blood_group6","AB-","AB-"),
                        new FieldOption("blood_group7","O+","O+"),
                        new FieldOption("blood_group8","O-","O-"),
                    
                    ]).setColumnWidth(6).setCondition('apply_for_new_id','بلی'),
                    new FormField('is_kochi','','btn-group',true,'',[
                        new FieldOption("kochi1",1).setIcon('fas fa-check-circle'),
                        new FieldOption("kochi2",0).setIcon('fas fa-times-circle')
                    ]).setColumnWidth(6).setCondition('apply_for_new_id','بلی'),
                    new FormField('kochi_spring_residence','','addressAutocomplete',true,{village:"",district:"",province:"",country:"1"}).hideField('country').hideField('village').setCondition("is_kochi",1).setCondition('apply_for_new_id','بلی').setColumnWidth(12),
                    new FormField('kochi_winter_residence','','addressAutocomplete',true,{village:"",district:"",province:"",country:"1"}).setCondition("is_kochi",1).hideField('country').hideField('village').setCondition('apply_for_new_id','بلی').setColumnWidth(12),
                    new FormField('ethnicity','قومیت','select',true,[]).setCondition('apply_for_new_id','بلی').setColumnWidth(4).setLanguageOption(this.api,'ethnicities'),
                    new FormField('religion','دین','select',true,'',[
                        new FieldOption("religion1","اسلام","اسلام"),
                        new FieldOption("religion2","هندو","هندو"),
                        new FieldOption("religion3","سیک","سیک"),
                        new FieldOption("religion4","عیسوی","عیسوی"),
                        new FieldOption("religion5","یهودی","یهودی"),
                        new FieldOption("religion6","بودایی","بودایی"),
                    ]).setCondition('apply_for_new_id','بلی').setColumnWidth(4),
                    new FormField('religion_sector','','select',false,'',[
                        new FieldOption('mazhab_1','سنی','سنی'),
                        new FieldOption('mazhab_2','شیعه','شیعه'),
                        new FieldOption('mazhab_3','دیگر','دیگر'),
                    ]).setCondition('apply_for_new_id','بلی').setColumnWidth(4),
                    new FormField('disability_type','','btn-group',false,'',[
                        new FieldOption("no","نه / نخیر").setColumnWidth(4),
                        new FieldOption("partial","قسمی").setColumnWidth(4),
                        new FieldOption("full","کلی").setColumnWidth(4),
                        
                    ]).setColumnWidth(6).setCondition('apply_for_new_id','بلی'),
                    new FormField('occupation','','text',false).setCondition('apply_for_new_id','بلی').setColumnWidth(6),
                    new FormField('second_citizenship','','btn-group',false,'',[
                        new FieldOption("yes","هو /بلی").setColumnWidth(6).setIcon('fas fa-check-circle'),
                        new FieldOption("no","نه / نخیر").setColumnWidth(6).setIcon('fas fa-times-circle'),
                    ]).setCondition('apply_for_new_id','بلی').setColumnWidth(4),
                    new FormField('second_citizenship_country','').setCondition('second_citizenship',"هو /بلی").setColumnWidth(4),
            
                    new FormField('voting_place','','text',false).setCondition('apply_for_new_id','بلی').setColumnWidth(4),
                    new FormField('identification_type','','btn-group',true,'',[
                        new FieldOption("id1","تذکره  دارد").setIcon('fas fa-file-alt'),
                        new FieldOption("id3","تذکره ندارد").setIcon('fas fa-times-circle'),
                    ]).setColumnWidth(12).setCondition('apply_for_new_id','بلی'),
            
                    new FormField('paper_id_no','','date',true,"",[
                        new FieldOption('paper_id_year',"","",4).setType('textNumber').setMask('0000').setColumnWidth(2),
                        new FieldOption('paper_id_volume',"","",3).setMaxLength(20).setColumnWidth(2),
                        new FieldOption('paper_id_page',"","",3).setMaxLength(10).setColumnWidth(2),
                        new FieldOption('paper_id_registration',"","",3).setMaxLength(25).setColumnWidth(2),
                        new FieldOption('paper_id_sokok',"","",3).setMaxLength(25).setColumnWidth(2),
                    ]).setColumnWidth(12).setCondition('identification_type','تذکره  دارد').setCondition('apply_for_new_id','بلی'),
                    
                    new FormField('id_issue_date','','date',true,"",[
                        new FieldOption('id_issue_date_day',"","",3).setColumnWidth(4),
                        new FieldOption('id_issue_date_month',"","",3).setColumnWidth(4),
                        new FieldOption('id_issue_date_year',"","",3).setType('textNumber').setMask('0000').setColumnWidth(4),
                    
                    ]).setColumnWidth(12).setCondition('identification_type','تذکره  دارد').setCondition('apply_for_new_id','بلی'),

                    new FormField('gurantor1','','title').setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true).setColumnWidth(12).setButtonName('first_gurantor'),
                    new FormField('first_gurantor_name','','text',true).setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),
                    new FormField('first_gurantor_surname','','text',false).setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),
                    new FormField('first_gurantor_father_name','').setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),
                    new FormField('first_gurantor_father_surname','','text',false).setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),
                    new FormField('first_gurantor_dob','','dob_auto',true,"",[
                        new FieldOption('first_gurantor_dob_day',"",""),
                        new FieldOption('first_gurantor_dob_month',"",""),
                        new FieldOption('first_gurantor_dob_year',"",""),
                    ]).setColumnWidth(12).setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),      
                    new FormField('first_gurantor_identity_type','','btn-group',false,'',[
                        new FieldOption("digital_id","تذکره الکترونیکی").setIcon('fas fa-address-card').setMask('0000-0000-00000'),
                        new FieldOption("paper_id","تذکره کاغذی").setIcon('fas fa-file-alt'),
                    ]).setCondition('apply_for_new_id','بلی').setColumnWidth(12).setCondition('identification_type','تذکره ندارد',true),
                  
                    /*
                    new FormField('first_gurantor_gender','','btn-group',true,'',[
                        new FieldOption("male",1).setLabel(this.api.translateService.get("male")).setIcon('fas fa-male').setColumnWidth(6),
                        new FieldOption("female",2).setLabel(this.api.translateService.get("female")).setIcon('fas fa-female').setColumnWidth(6),
            
                    ]).setColumnWidth(6).setTip('select_gender').setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),
                    */
                    new FormField('first_gurantor_paper_id','','date',true,"",[
                        new FieldOption('first_gurantor_paper_id_year',"","",4).setColumnWidth(2),
                        new FieldOption('first_gurantor_paper_id_volume',"","",3).setColumnWidth(2),
                        new FieldOption('first_gurantor_paper_id_page',"","",3).setColumnWidth(2).setType('number').setMaxLength(3),
                        new FieldOption('first_gurantor_paper_id_registration',"","",3).setColumnWidth(2).setType('number').setMaxLength(4),
                        new FieldOption('first_gurantor_paper_id_sokok',"","",3).setColumnWidth(2).setType('number'),
                    ]).setColumnWidth(12).setCondition('first_gurantor_identity_type','تذکره کاغذی')
                    .setCondition('identification_type','تذکره ندارد',true),


                    new FormField('first_gurantor_digital_id','','mask',true)
                    .setCondition('first_gurantor_identity_type','تذکره الکترونیکی')
                    .setCondition('apply_for_new_id','بلی'),
                
                    new FormField('first_gurantor_id_issue_place','','addressAutocomplete',true,{village:"",district:"",province:"",country:"1"}).setCondition('apply_for_new_id','بلی').hideField('country').setCondition('first_gurantor_identity_type','تذکره کاغذی').setCondition('identification_type','تذکره ندارد',true).setColumnWidth(12),
                    
                    new FormField('first_gurantor_id_issue_date','','date',true,"",[
                        new FieldOption('first_gurantor_id_issue_date_day',"","",3).setColumnWidth(4),
                        new FieldOption('first_gurantor_id_issue_date_month',"","",3).setColumnWidth(4),
                        new FieldOption('first_gurantor_id_issue_date_year',"","",3).setColumnWidth(4),
                    
                    ]).setCondition('apply_for_new_id','بلی').setCondition('first_gurantor_identity_type','تذکره کاغذی').setCondition('identification_type','تذکره ندارد',true).setColumnWidth(12),
                   
                   
                    new FormField('first_gurantor_contact_no','','mask',true).setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true).setMask('0000-0000-000-000').setPlaceholder("0093-0000-000-000"),
                    
                    
                    new FormField('gurantor2','','title').setCondition('apply_for_new_id','بلی').setColumnWidth(12).setButtonName('second_gurantor').setCondition('identification_type','تذکره ندارد',true),
                    new FormField('second_gurantor_name','','text',true).setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),
                    new FormField('second_gurantor_surname','','text',false).setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),
                    new FormField('second_gurantor_father_name','').setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),
                    new FormField('second_gurantor_father_surname','','text',false).setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),
                    new FormField('second_gurantor_dob','','dob_auto',true,"",[
                        new FieldOption('second_gurantor_dob_day',"",""),
                        new FieldOption('second_gurantor_dob_month',"",""),
                        new FieldOption('second_gurantor_dob_year',"",""),
                    ]).setColumnWidth(12).setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),                   
                    new FormField('second_gurantor_identity_type','','btn-group',false,'',[
                        new FieldOption("digital_id","تذکره الکترونیکی","").setIcon('fas fa-address-card'),
                        new FieldOption("paper_id","تذکره کاغذی","").setIcon('fas fa-paper-alt'),
                    ]).setCondition('apply_for_new_id','بلی').setColumnWidth(12).setCondition('identification_type','تذکره ندارد',true),
                   
                   
                    new FormField('second_gurantor_paper_id',' ','date',true,"",[
                        new FieldOption('second_gurantor_paper_id_year',"","",4).setColumnWidth(2),
                        new FieldOption('second_gurantor_paper_id_volume',"","",3).setColumnWidth(2),
                        new FieldOption('second_gurantor_paper_id_page',"","",3).setColumnWidth(2).setType('number').setMaxLength(3),
                        new FieldOption('second_gurantor_paper_id_registration',"","",3).setColumnWidth(2).setType('number').setMaxLength(4),
                        new FieldOption('second_gurantor_paper_id_sokok',"","",3).setColumnWidth(2).setType('number'),
                    ]).setColumnWidth(12).setCondition('second_gurantor_identity_type','تذکره کاغذی').setCondition('identification_type','تذکره ندارد',true),
                    new FormField('second_gurantor_digital_id','','mask',false).setCondition('second_gurantor_identity_type','تذکره الکترونیکی').setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true),
                
                    new FormField('second_gurantor_id_issue_place','','addressAutocomplete',true,{village:"",district:"",province:"",country:"1"}).hideField('country').setCondition('apply_for_new_id','بلی').setCondition('second_gurantor_identity_type','تذکره کاغذی').setCondition('identification_type','تذکره ندارد',true).setColumnWidth(12),
                    new FormField('second_gurantor_id_issue_date','','date',true,"",[
                        new FieldOption('second_gurantor_id_issue_date_day',"","",4).setColumnWidth(4),
                        new FieldOption('second_gurantor_id_issue_date_month',"","",4).setColumnWidth(4),
                        new FieldOption('second_gurantor_id_issue_date_year',"","",4).setColumnWidth(4),
                    
                    ]).setCondition('apply_for_new_id','بلی').setCondition('second_gurantor_identity_type','تذکره کاغذی').setCondition('identification_type','تذکره ندارد',true).setColumnWidth(12),
                  
                    new FormField('second_gurantor_contact_no','','mask',true).setCondition('apply_for_new_id','بلی').setCondition('identification_type','تذکره ندارد',true).setMask('0000-0000-000-000').setPlaceholder("0093-0000-000-000"),
                ];
                this.form = new FormGroup(this.toFormGroup(this.fields),{ updateOn: 'change' ,validators:ValidIssueDateValidator});
             
        if(data==undefined){
            return;
        }

        for(let fieldName in data){
           
            let field = this.getFieldByName(fieldName);
            if(field){
        
            if(field.type =='date'){
                //console.log('field options',field.options);
                for(let o of field.options){
                    //console.log('field Name',fieldName,"Option id",o.id);
                    if(data[fieldName]!=null && data[fieldName].hasOwnProperty(o.id)){
                        o.setValue(data[fieldName][o.id]);
              
                    }
                    
                }
            }else{
                field.value = data[fieldName];
                
            }
                
        }
           
        }
 
        this.form = new FormGroup(this.toFormGroup(this.fields),{ updateOn: 'change' });
      
    }
     



    getFieldValue(name){

        return this.form.get(name).value;
      
     }


 

    close(){
        this.collapse = true;
    }
    open(){
        if(this.form.get('reference_no').value && this.form.get('status').value != 13){
                alert('درخواستی این شخص لغوه نگردیده است!');
                return false;
        }

        this.collapse = false;
       
    }
    isActive(){
        return this.collapse == false;   
    }
    toggleCollapse(){
       // console.log("Collapse",this.collapse);

        return this.collapse = !this.collapse;
    }

    values(){
        let result={};
        for(let g=0;g<this.fields.length;g++){
           
                let f = this.fields[g];
                if(f.type == 'date'){

                    for(let dateField of f.options){
                    
                        result[dateField.id] = dateField.value;
                    }
                }
                result[f.name] = f.value;
        }
        
        return result;
    }

  
    getFieldsIndexByName(query){
        let result =[];
        for(let g=0;g<this.fields.length;g++){
         
                let field = this.fields[g];
                if( field.name.indexOf(query) ===0 ){
                   return g;
                }
            
           
        }

        return false;


    }
    public fieldUpdated(fieldName,family_head){
     
        this.updateRequiredFiles();
        
        if(family_head == undefined){
            return false;
        }
     
        if(fieldName=='paper_id_year'){

            if( this.getFieldValue('paper_id_year') !=''){
                this.setFieldValue('id_issue_date_year',this.getFieldValue('paper_id_year'));
            }
        }
        if(fieldName=='living_status'){
            if( this.getFieldValue('living_status') !=1){
                this.setFieldValue('apply_for_new_id','نخیر');
                this.disableField('apply_for_new_id');
            }else{
                this.enableField('apply_for_new_id');
            }
        }
        if(fieldName!='relationship_with_head_of_family'){
            return false;
        }
        let relationshipField = this.form.get('relationship_with_head_of_family');
        let shouldAutoFill    = family_head.getFieldValue('gender') == 1;
        let relationship = relationshipField.value;
 
            this.setFieldValue('name','');
            this.setFieldValue('surname','');
            this.setFieldValue('father_name','');
            this.setFieldValue('father_surname','');
            this.setFieldValue('grand_father_name','');
            this.setFieldValue('gender','');
            this.setFieldValue('grand_father_surname','');
            let maleRelationships=[2,4,6,8,10,16,20,22,24,28,30,12,32,34,35,37,38,13,41,43,44,46,49,50,53,55];              
            let femaleRelationships=[3,5,7,9,11,17,19,21,23,25,26,27,29,31,33,14,36,15,39,40,42,45,47,48,51,52,54,56,57];              
            if(maleRelationships.indexOf(parseInt(relationship))!=-1){
                    this.setFieldValue('gender',1);
            } 
            console.log('FOUND IN FEMALE',femaleRelationships.indexOf(parseInt(relationship)));
            if(femaleRelationships.indexOf(parseInt(relationship))!=-1){
                this.setFieldValue('gender',2);
            } 
            if(shouldAutoFill){
                if( relationship == 8 || relationship == 9){
                    //this.setFieldValue('name','');
                    this.setFieldValue('surname','');
                    this.setFieldValue('father_name',family_head.getFieldValue('father_name'));
                    this.setFieldValue('father_surname',family_head.getFieldValue('father_surname'));
                    this.setFieldValue('grand_father_name',family_head.getFieldValue('grand_father_name'));
                    this.setFieldValue('grand_father_surname',family_head.getFieldValue('grand_father_surname'));              

                    //this.setFieldValue('current_residence',{village:'',district:'',province:''});
                    //this.setFieldValue('original_residence',family_head.getFieldValue('original_residence);
                    
                }

                if( relationship == 4 || relationship== 5){
                    //this.setFieldValue('name','');
                    this.setFieldValue('surname',family_head.getFieldValue('surname'));
                    this.setFieldValue('father_name',family_head.getFieldValue('name'));
                    this.setFieldValue('father_surname',family_head.getFieldValue('surname'));
                    this.setFieldValue('grand_father_name',family_head.getFieldValue('father_name'));
                    this.setFieldValue('grand_father_surname',family_head.getFieldValue('father_surname'));
                

                }

                if( relationship == 6){
                    this.setFieldValue('name',family_head.getFieldValue('father_name'));
                    this.setFieldValue('surname',family_head.getFieldValue('father_surname'));
                    this.setFieldValue('father_name',family_head.getFieldValue('grand_father_name'));
                    this.setFieldValue('father_surname',family_head.getFieldValue('grand_father_surname'));
                    this.setFieldValue('grand_father_name','');
                    this.setFieldValue('grand_father_surname','');

                }
        }
            
       
    }

    public setFieldValue(name,value,formOptionId:any=false){

        this.form.get(name).setValue(value);
        
        let field = this.getFieldByName(name);
        if(field && field.hasOwnProperty('value')){
            field.value = value;
        }
        
        if(formOptionId!=false){
            let options = field.options;
            for(let o=0;o<options.length;o++){
                if(options[o].id == formOptionId){
                    field.options[o].value=value;
                }
            }
        }
        
    }

    public getFieldByName(name){
        let index = this.getFieldsIndexByName(name);
        if(index !==false){
            return this.fields[index];
        }
        
        return false;
    
    }

    
    public disableField(name){
  
        let field = this.getFieldByName(name);
        field.disable();
      
    }
    public enableField(name){
        let field = this.getFieldByName(name);
        field.enable();
      
    }

    public removeOption(name,value){
        let field = this.getFieldByName(name);
        field.value = value;
        let options = field.options;
        for(let o=0;o<options.length;o++){
                if(options[o].value == value){
                    field.options.splice(o,1);
                }
        }
        
    }
    
    isHeadOfFamily(){
      
        return this.getFieldValue('relationship_with_head_of_family')== 1;
    }
    getBirthDayGregorian(fieldName){
        if(this.form.get('birthday_day') && this.form.get('birthday_month') && this.form.get('birthday_year')){
            let day = this.form.get('birthday_day').value;
            let month = this.form.get('birthday_month').value;
            let year = this.form.get('birthday_year').value;
            if(!isValidJalaliDate(year, month, day)){
                return false;
            }
    
            let gDate = Jalaali.toGregorian(jalaliNumber(year), jalaliNumber(month), jalaliNumber(day));
      
            return gDate.gd+"-"+gDate.gm+"-"+gDate.gy;
            
        }

    }
      

   

    toFormGroup(fields){
        let group = {};
        fields.forEach(field=>{
            let validators =[];
           
            if(field.required){
                validators.push(Validators.required);
            }
            if(field.type == 'date'){
                field.options.forEach(o=>{
                    group[o.id] = new FormControl(o.value,validators);
                });
            }
            else if(field.type == 'dob_auto'){
                field.options.forEach(o=>{
                    
                    if(!field.value){
                        field.value ={birthday_day:'',birthday_month:'',birthday_year:''};
                    }
               
                    let val = field.value[o.id];
           
                    group[o.id] = new FormControl(val,validators);
                });

            }else if(field.type == 'addressAutocomplete'){
                    
                    group[field.name] = new FormGroup({
                        village:new FormControl(field.value.village,validators),
                        district:new FormControl(field.value.district,validators),
                        province:new FormControl(field.value.province,validators),
                        country:new FormControl(field.value.country,validators),
                    });
            
            }else if(field.name =='has_digital_id'){
                group[field.name] =  new FormControl(field.value,validators);
                group[field.name].valueChanges.subscribe(val=>{
                    if(val == '1'){
                        this.form.get('apply_for_new_id').setValue('نخیر');
                    }
                    if(val == '0'){
                        this.form.get('apply_for_new_id').setValue('بلی');
                    }
                });
            }
           

         
            else{
                group[field.name] =  new FormControl(field.value,validators);
            }
            
     
        });
     
        return group;
    }

    isVisible(field){
        let result=true;
            if(field.forceShow){
                return true;
            }
        for(let i=0;i<field.conditions.length;i++){
            let condition = field.conditions[i];
            let fieldValue = this.form.get(condition.name).value;
            if(condition.equalsTo){
                if(field.name == 'english_name'){
                   // console.log('field Value ',fieldValue,"==",condition.value);
                }
                result= result && (fieldValue == condition.value);
            }

            if(!condition.equalsTo){
                result= result && (fieldValue != condition.value);
            }
          

        }

       
            if(this.isSecondGurantorRequired()){
                this.setFieldValue('isSecondGurantorVisible',true);
            }else{
                this.setFieldValue('isSecondGurantorVisible',false);
            }
        
       
        return result;
    }

   public hideField(fieldName){
       let field = this.getFieldByName(fieldName);
        field.setCondition('relationship_with_head_of_family',1,false);
   }
   public isMoreThan6YearsOld(){
    let dob_day= this.getFieldValue('birthday_day');
    let dob_month= this.getFieldValue('birthday_month');
    let dob_year= this.getFieldValue('birthday_year');
    let dob:any    =false;
    let ageIsMoreThan6= true;
    if(isValidJalaliDate(dob_year, dob_month, dob_day)){
           dob = Jalaali.toGregorian(jalaliNumber(dob_year), jalaliNumber(dob_month), jalaliNumber(dob_day));
     
           dob = moment([dob.gy,dob.gm-1,dob.gd]);
           
           let duration:any = moment.duration(moment().diff(dob));
               duration = duration.asYears();
             //  console.log('DURATION',duration);
               if(duration < 6){
                   ageIsMoreThan6 = false;
               }



    }
    return ageIsMoreThan6;
   }
   public isMoreThan18YearsOld(){
    let dob_day= this.getFieldValue('birthday_day');
    let dob_month= this.getFieldValue('birthday_month');
    let dob_year= this.getFieldValue('birthday_year');
    let dob:any    =false;
    let ageIsMoreThan18= true;
    if(isValidJalaliDate(dob_year, dob_month, dob_day)){
           dob = Jalaali.toGregorian(jalaliNumber(dob_year), jalaliNumber(dob_month), jalaliNumber(dob_day));
           dob = moment([dob.gy,dob.gm-1,dob.gd]);
           
           let duration:any = moment.duration(moment().diff(dob));
               duration = duration.asYears();               
               if(duration < 18){
                   ageIsMoreThan18 = false;
               }


    }
    return ageIsMoreThan18;
   }
   public updateRequiredFiles(){
     let wantsToApply= this.getFieldValue('apply_for_new_id') == 'بلی';
     let currentLivingStatus= this.getFieldValue('living_status') ==1;
   
     if(wantsToApply && currentLivingStatus){
            let file = {
                label:'photo',
                description:'photo_description',
                uploader:new Uploader({url:this.api.endpoint+"/uploadFile",autoUpload:true, queueLimit:1,additionalParameter:{name:'photo'} }),
                multiple:false,
             
             };
            
            if(this.isMoreThan6YearsOld() && this.uploadFieldExists('photo')=== false){
                this.files.push(file);
            }
            if(this.uploadFieldExists('photo')!==false && this.isMoreThan6YearsOld() == false){
                this.files.splice(this.uploadFieldExists('photo'),1);
            }

            file.uploader.onSuccessItem=(file,response)=>{
                response = JSON.parse(response);
                this.setFieldValue('photo',[{name:file.file.name,path:response['filePath']}]);
            }
            

            file.uploader.onErrorItem=(item, response: string, status: number, headers)=>{
                this.setFieldValue('photo','');
                response = JSON.parse(response);
                let key = Md5.hashAsciiStr(item.file.name).toString();
                file.uploader.errors[key]= response['errors'];
            
                return { item, response, status, headers };
            }
            //Add already saved files in the queue
            this.addSavedFilesToQueue(file.uploader,'photo');
            
            let isPaperIdRequired = this.getFieldValue('identification_type') == 'تذکره  دارد';
            if(isPaperIdRequired){
                let file = {
                    label:'paper_id_files',
                    description:'paper_id_description',
                    uploader:new Uploader({url:this.api.endpoint+"/uploadFile",autoUpload:true,additionalParameter:{name:'paper_id_files'} }),
                    multiple:true,
                 
                 };
                 file.uploader.onSuccessItem=(file,response)=>{
                    response = JSON.parse(response);
                    let paperFiles=this.getFieldValue('paper_id_files');
                    if(paperFiles =="" || paperFiles == null){
                        paperFiles=[];
                    }
                    paperFiles.push({name:file.file.name,path:response['filePath']});
                     
                    this.setFieldValue('paper_id_files',paperFiles);
                        
                    
                }
                file.uploader.onErrorItem=(item, response: string, status: number, headers)=>{
                    this.setFieldValue('paper_id_files','');
                    response = JSON.parse(response);
                    let key = Md5.hashAsciiStr(item.file.name).toString();
                    file.uploader.errors[key]= response['errors'];
                
                    return { item, response, status, headers };
                }
                
                if(this.uploadFieldExists('paper_id_files')=== false){
                    this.files.push(file);
                }
                
                
                //Add already saved files in the queue
                this.addSavedFilesToQueue(file.uploader,'paper_id_files');
            }else if(this.uploadFieldExists('paper_id_files')!==false){
                this.files.splice(this.uploadFieldExists('paper_id_files'),1);
            }
       
            

            let isRelativeIdRequired = this.isMoreThan18YearsOld() && this.getFieldValue('identification_type') != 'تذکره  دارد';
            if(isRelativeIdRequired){
                let file = {
                    label:'relative_id_document',
                    description:'relative_id_document_description',
                    uploader:new Uploader({url:this.api.endpoint+"/uploadFile",autoUpload:true,additionalParameter:{name:'relative_id_document'} }),
                    multiple:true,
                
                };
                file.uploader.onSuccessItem=(file,response)=>{
                    response = JSON.parse(response);
                    let relative_id_document=this.getFieldValue('relative_id_document');
                    if(relative_id_document =="" || relative_id_document==null){
                        relative_id_document=[];
                    }
                  
                    relative_id_document.push({name:file.file.name,path:response['filePath']});
                     
                    this.setFieldValue('relative_id_document',relative_id_document);
                    //Add already saved files in the queue
                     
                    
                }
                 file.uploader.onErrorItem=(item, response: string, status: number, headers)=>{
                    this.setFieldValue('relative_id_document','');
                  
                        response = JSON.parse(response);
                    
                    let key = Md5.hashAsciiStr(item.file.name).toString();
                    file.uploader.errors[key]= response['errors'];
                
                    return { item, response, status, headers };
                 }
                 if(this.uploadFieldExists('relative_id_document')== false){
                    this.files.push(file);
                }
                this.addSavedFilesToQueue(file.uploader,'relative_id_document');  

            }
            else if(this.uploadFieldExists('relative_id_document')!==false){
                this.files.splice(this.uploadFieldExists('relative_id_document'),1);
            }

             

           

     }else{
         this.files=[];
     }
        this.removeFilesIfNotInQueue();
    }

    public uploadFieldExists(name){
        for(let i=0; i< this.files.length;i++){
            let f = this.files[i];
            if(f.label == name){
                return i;
            }
        }

        return false;
    }

    public removeFilesIfNotInQueue(){
        for(let i=0; i< this.files.length;i++){
            let f = this.files[i];
            let value = this.getFieldValue(f.label);
            if(value!=null && value !="" && typeof value == 'object'){
                for(let x=0; x < value.length ;x++){
                    if( f.uploader.isInQueue(value[x].name) == false){
                        value.splice(x,1);
                    }
                }
            }

            this.setFieldValue(f.label,value);
           
        }
    }
  

    public getSavedUploadedFiles(uploadInstance,name){
        let files=this.getFieldValue(name);
        let savedFiles =[];
            if(files && files.length > 0){
                for( let file of files){
                    let f =  new File([],file.name);
                    let fileItem =  new FileItem(uploadInstance,f,{ autoUpload:false});
                        fileItem.isUploaded=true;
                        fileItem.isSuccess=true;
                        fileItem.progress=100;
                        savedFiles.push(fileItem);

                }     
            }
        return savedFiles;
    }

    public addSavedFilesToQueue(uploaderInstance,name){
        let files = this.getSavedUploadedFiles(uploaderInstance,name);
  
        for(let f of files){
   
            uploaderInstance.queue.push(f);
        }
       

    }
    
    public makeVisible(name){
        let field = this.getFieldByName(name);
            if(field){
                field.makeVisible();
            }
            //alert(name);
    }

    public isSecondGurantorRequired(){
        return this.isMoreThan18YearsOld()== true;
    }

}
