import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewChildren,
  ElementRef
} from '@angular/core';
import {
  Api
} from '../services/Api';
import {
  IndividualForm
} from '../shared/IndividualForm';
import {
  Observable
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import {
  text
} from '@angular/core/src/render3';
import {
  FamilyMember
} from '../shared/FamilyMember';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  FormField
} from '../shared/FormField';
import * as Jalaali from "jalaali-js";
import * as R from 'ramda';
import {
  ReCaptchaV3Service
} from 'ng-recaptcha';
import {
  Router
} from '@angular/router';
import * as moment from 'moment';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormSavedConfirmationComponent} from '../form-saved-confirmation/form-saved-confirmation.component';
import {Md5} from 'ts-md5/dist/md5';
import { daysInJalaliMonth, isValidJalaliDate, jalaliNumber } from '../shared/JalaliDate';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-individualform',
  templateUrl: './individualform.component.html',
  styleUrls: ['./individualform.component.css']
})
export class IndividualformComponent implements OnInit {
  currentForm = "";
  applicationNotFound: boolean = false;
  application_id: string = "";
  @ViewChildren('textFields') rows: ElementRef;
  public errors: any = [];
  public step: number = 1;
  public provinces: any = [];
  public districts: any = {};
  public villages: any = [];
  public processing: boolean = false;
  public reference_no: string = "";
  public months = [];
  public years = [];
  public centerProvinces: any = [];
  public centerCountries: any = [];
  public head_of_family_dob_gregorian: any = false;

  public centerCountry: any = "";
  public centerProvince: string = "";
  public centerNames: any = [];
  public exampleData = [];
  public relationships = [];
  public countries = [];
  public errorKeys = [];
  public fieldKeys={};
  public appointments:any=[];
  public appointment_times:any=[];
  public selectedAppointmentDate="";
  public selectedAppointmentTime="";
  public savedAppointmentDate:any=false;
  public selectedCenter=false;
  public districtList:any=[];
  public provinceList:any=[];
  public is_new_application=true;
  public numberPattern={
    '0': { pattern: new RegExp('\[\u06F0-\u06F9\]|\\d')}
  };
  @ViewChild('searchApplicationId') searchBox: ElementRef;
  model: any = {
    head_of_family_name: "",
    gender: "",
    original_residence: {
      village: "",
      district: "",
      province: ""
    },
    current_residence: {
      village: "",
      district: "",
      province: ""
    },
    head_id_issue: {
      province: "",
      district: ""
    },
    members: [

    ]
  };

  public Center = {};
  public submittedForm: any = {
    reference_no: ""
  };

  
  constructor(public api: Api, private translate: TranslateService, private recaptchaV3Service: ReCaptchaV3Service, private router: Router,config: NgbModalConfig, private modalService: NgbModal,private spinner:NgxSpinnerService) {

    this.months = [];
    this.years = [];

    for (let i = 1; i < 13; i++) {
      this.months.push({id:i,text:this.getMonthName(i)});
    }
    
    let today= Jalaali.toJalaali(new Date());
    
    for (let i = today.jy; i > 1289; i--) {
      this.years.push(i);
    }
    this.setRelationships();
    let state = this.router.getCurrentNavigation().extras.state;
    if (state && state.hasOwnProperty('foundApplication')) {
      setTimeout(()=>{
        this.setSavedApplication(state.foundApplication);
      },2000);
    
    } else {
      this.createNewForm();
    }
    config.backdrop = 'static';
    config.keyboard = false;


    
     // this.fileUploadOptions.headers=[{ name: 'Content-Type', value : 'application/json' } ];
     // this.setDistrictList();

  }
  ngAfterViewInit() {
   // this.paper_id_uploader.onAfterAddingFile = (item => {
     // item.withCredentials = false;
   // });
   
  }

  setDistrictList(){
      this.api.process("/getDistricts",{},'get').subscribe((districts:any)=>{
          this.districtList = districts;
         this.setProvinceList(districts);
      },()=>{
        alert('لست ولسوالی های دریافت نشد!')
      });
  }
  
  getMonthName(i){
    let months={
      '1':'حمل',
      '2':'ثور',
      '3':'جوزا',
      '4':'سرطان',
      '5':'اسد',
      '6':'سنبله',
      '7':'میزان',
      '8':'عقرب',
      '9':'قوس',
      '10':'جدی',
      '11':'دلو',
      '12':'حوت',
    }

    return i+" - "+months[i]+"";
  }
  setRelationships() {
    this.api.translateService.get('relationships').subscribe((list) => {
      //list = list.filter(val=> val == 'پلار');
      let removeIfSingle = ["همسر", "پسر", "دختر", "ښځه", "زوی", "لور"];
      if (this.model.marital_status == 'مجرد') {
        list = list.filter(val => val == 'همسر');
      }
      // this.relationships = list;
    });
  }
  ngOnInit() {

    this.setProvinces();
    this.setCenterCountries();
    if(this.model.members.length == 0){
      this.addFamilyMember();
    }

  }
  submitForm() {
    this.errors = [];
    this.errorKeys = [];
    this.processing=true;
    this.recaptchaV3Service.execute('new_id')
      .subscribe(token => {
        this.model['token'] = token;

        this.api.process('/submit-individual-form', this.getModelData()).subscribe(res => {
          this.router.navigateByUrl("/individual-form-confirmation", {
            state: {
              submittedForm: res
            }
          });
        }, error => {
          try{
            this.errors = error.error.errors;
            this.errorKeys = Object.keys(this.errors);
            this.processing=false;
          }catch(error){
            this.processing=false;
          }
          
     

        });
      });

    
  }

  saveForm() {
    return this.api.process('/saveForm', {
      application_id: this.application_id,
      data: this.removeUploadedImages(this.getModelData(true))
    });
  }

  removeUploadedImages(data) {
    for (let i = 0; i < data.members.length; i++) {
      //data.members[i]['paper_id_copy'] = "";
    }
    return data;
  }
  
  centerSelected(fieldValue, fieldName) {
    this.appointments=[];
    this.appointment_times=[];
    this.selectedCenter=false;
    if (fieldName == 'country') {
      this.setCenterProvinces(fieldValue.value);
    } else if (fieldName == 'province') {
      this.setCenters(fieldValue.value);
      this.centerNames = [];
      this.centerProvince = fieldValue.value;
      this.model['center_id'] = '';

    } else {
      //this.model['center_id'] = fieldValue.value;
      let searchedCenter=this.getCenterById(this.model.center_id);
      if(searchedCenter.length>0){
        this.selectedCenter = searchedCenter[0];
      }
      this.getAppointments(this.model.center_id);
      setTimeout(() => {
        if (this.rows.hasOwnProperty('first')) {
          // this.rows.nativeElement.focus();
        }
      }, 1000);

    }

  }

  setProvinces() {
    let searchText = "";
    this.spinner.show();
    this.api.process("/searchProvinces?query=" + searchText, {}, 'GET').subscribe(res => {
      this.provinces = res;
      this.spinner.hide();
    },(e)=>{
      this.spinner.hide();
    });

    this.api.translateService.get('countries').subscribe(res => {
      this.countries = res;


    });
  }
  setCenterProvinces(country) {
    let promise = new Promise<void>((resolve, reject) => {
      this.api.process("/searchCenters?field=province&country=" + country, {}, 'GET').subscribe(res => {
        this.centerProvinces = res;
        if (this.application_id && this.model.center_id) {
          this.setCenters('unknown', this.model.center_id);
        }
        resolve();
      });
    });

    return promise;

  }
  setCenterCountries() {
    //this.spinner.show();
    this.api.process("/searchCenters?field=country", {}, 'GET').subscribe(res => {
       this.centerCountries = res;
     // this.spinner.hide();
      if (this.application_id && this.model.center_id) {
        this.setCenters('unknown', this.model.center_id);
      }
    },(e)=>{
      //this.spinner.hide();
    });
  }

  setCenters(province, center_id ? ) {

    if (center_id == undefined) {
      center_id = 'unknown';
    }
    this.spinner.show();
    console.log('setCenters center_id',center_id);
    console.log('province_name',province);
    this.api.process("/searchCenters?field=name&province=" + province + "&id=" + center_id, {}, 'GET').subscribe(res => {
      this.centerNames = res;
      this.spinner.hide();
      for (let c of this.centerNames) {
        if (c.id == this.model.center_id) {
          this.centerProvince = c.province;
        }
      }

    },(e)=>{
      this.spinner.hide();
    });
  }

  districtSelected(event, fieldName, member) {
  
    if(event.value== null){
      event.value='';
    }
    if (event.value) {

      // member.form.get(fieldName+".district").setValue(event.value);
      let field = member.form.get(fieldName);
         
          field.setValue(event.value);
      member.setFieldValue(fieldName, event.value);
    }
  }
  searchVillages = (text$: Observable < string > ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((searchText) => this.api.process("/searchVillages?query=" + searchText, {}, 'GET')),
    )

  searchDistricts = (text$: Observable < string > ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((searchText) => this.api.process("/searchDistricts?query=" + searchText, {}, 'GET')),
    )

  /*
    searchProvinces = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap( (searchText) =>  this.api.process("/searchProvinces?query="+searchText,{},'GET')),
    )
  
*/
  formatVillageSearch(r) {
    return r.village + " " + r.district + " " + r.province;
  }
  formatDistrictSearch(r) {
    return r;
  }
  formatProvinceSearch(r) {
    return r;
  }

  formatResult(type, event) {

  }
  formatValue(value) {

  }
  selectOriginalVillage(village) {
    this.model.original_residence_district = village.item;
    this.model.original_residence_province = village.item;
  }

  selectCurrentVillage(village) {
    this.model.current_residence_district = village.item;
    this.model.current_residence_province = village.item;
  }

  selectVillage(village, model) {
    setTimeout(() => {
      model.district = village.item.district;
      model.province = village.item.province;
      model.village = village.item.village;
    }, 1000);

  }

  formatVillageValue(r) {
    if (typeof r == 'object') {
      return r.village;
    }
    return r;
  }
  formatDistrictValue(r) {
    if (typeof r == 'object') {
      return r.district
    }
    return r;
  }

  formatProvinceValue(r) {
    if (typeof r == 'object') {
      return r.province;
    }

    return r;
  }

  setValue(value, k1, k2 ? , k3 ? , k4 ? , k5 ? ) {
    if (k2 == undefined) {
      this[k1] = value;
      return;
    }
    if (k3 == undefined) {
      this[k1][k2] = value;
      return;
    }

    if (k4 == undefined) {
      this[k1][k2][k3] = value;
      return;
    }
    if (k5 == undefined) {
      this[k1][k2][k3][k4] = value;
      return;
    } else {
      this[k1][k2][k3][k4][k5] = value;
    }
  }

  nextStep() {
    this.spinner.show();
    let data = this.getModelData(true);

    this.errors = [];
    this.errorKeys = [];
    this.api.process("/validate?step=" + this.step, data).subscribe(res => {
      this.spinner.hide();
      this.step = this.step + 1;
      this.saveForm().subscribe(res => {
        this.application_id = res['application_id'];
        this.errors = [];
       
      }, errors => {
        this.errors = errors.error.errors;
      

      });
      if (this.step == 2) {



        setTimeout(() => {
          let element = document.getElementById('familymember-0');
          element.scrollIntoView();
          //this.collapseAllMembers();
          this.model.members[0].open();
        }, 1000);
      }
      this.errors = [];
    

    }, error => {
      this.spinner.hide();
      this.errors = error.error.errors;
      this.errorKeys = Object.keys(this.errors);
    });

  }
  previousStep() {
    if (this.step > 1) {
      this.step = this.step - 1;
      this.errors = [];
    }

  }

  removeMember(index) {
    let con = confirm('آیا میخواهید این فرد را حذف کنید؟');
    if (!con) {
      return false;
    }
    if (this.model.members.length > 1) {
      this.model.members.splice(index, 1);
    }
    if (this.model.members.length > 0) {
      this.model.members[this.model.members.length - 1].open();
    }

    this.updateCopyFrom();
  }


  selectValue(value, model) {
    this[model] = value;
  }

  selectItem(data, field, key) {
    this.model[field] = data[key];
  }

  nextMember(currentMemberIndex,increment) {
    console.log('NEXT MEMBER',currentMemberIndex);
    let data = this.getModelData();
    this.errorKeys = [];
    this.spinner.show();
    this.api.process("/validate?step=3&member=" + this.getActiveMemberIndex(), data).subscribe(res => {
      this.spinner.hide();
      this.errors = [];
      if(increment){
        currentMemberIndex = currentMemberIndex+1;
      }
      if (currentMemberIndex < this.model.members.length) {
        
     
        this.collapseAllMembers();
        this.model.members[currentMemberIndex].open();
      
        if(increment == false){
          return;
        }
        let element = document.getElementById('familymember-' + (currentMemberIndex));
        this.updateRelationships(this.model.members[currentMemberIndex]);
        setTimeout(() => {
          element.scrollIntoView();
        }, 1000);

      } else {
        /*
        if(this.step == 3 && this.model.members.length > 0 && this.getOpenMemberIndex() < this.model.members.length-1){
          this.model.members[this.getOpenMemberIndex()].toggleCollapse();
          this.model.members[this.getOpenMemberIndex()+1].toggleCollapse();
        }
        */
        this.step = 2;
        let element = document.getElementById('top');
        setTimeout(() => {
          element.scrollIntoView();
        }, 1000);
      }
      let member = this.model.members[currentMemberIndex];
      /*
      if (member.getFieldValue('living_status') != 1) {
         member.setFieldValue('living_status', 'نخیر');
      }
      */
      if (this.model['center_id'] && this.model['center_id'] > 0) {
        //this.setCenterById(this.model.center_id);
      }
      this.saveForm().subscribe(res => {
       
        this.application_id = res['application_id'];
        this.errors = [];
      }, errors => {
        this.errors = errors.error.errors;

      });

    }, error => {
      this.spinner.hide();
      this.errors = error.error.errors;
      this.errorKeys = Object.keys(this.errors);
    });
    this.updateCopyFrom();
  }

  setCenterById(center_id) {
    console.log('select center by id',center_id);
    this.model['center_id']=center_id;
    this.api.process("/searchCenters?field=id&id=" + center_id, {}, "GET").subscribe(res => {

      this.centerCountry = res!=null && res.hasOwnProperty('country') ? parseFloat(res['country']):'';
      console.log('centerCountry',this.centerCountry);
      this.setCenterProvinces(this.centerCountry).then(() => {
        this.centerProvince = res!=null && res.hasOwnProperty('province') ? res['province'] :'';
        console.log('centerProvinces',this.centerProvince);
        this.setCenters(this.centerProvince, center_id);

        this.getAppointments(center_id);

      });

    });
  }

  previousMember(currentMemberIndex) {

    if (this.model.members.length != 0 && currentMemberIndex > 0) {
      this.model.members[currentMemberIndex].close();
      this.model.members[currentMemberIndex - 1].open();



    } else {
      this.step = 1;
    }
    let element = document.getElementById('familymember-' + (currentMemberIndex - 1));
    setTimeout(() => {
      element.scrollIntoView();
    }, 1000);

    this.errors = [];


  }
  getModelData(removeFileAttachments: boolean = false) {
    let data = Object.assign({}, this.model);
    data['application_id'] = this.application_id;
    data.members = this.getMemberValues(removeFileAttachments);
    return data;
  }


  toPashto() {


    this.translate.setDefaultLang('ps');
  }

  setSavedApplication(res) {
    this.application_id = res['application_id'];
    let center_id = false;
    if( 'appointment' in res && res.appointment){
        this.savedAppointmentDate = res.appointment;
        center_id =res.appointment.center_id;
        this.setCenterById(res.appointment.center_id);
    }
  
    let members = res['data'].members;
    this.model = res['data'];
    this.model['members'] = [];
    this.is_new_application = res.is_new;



    for (let i = 0; i < members.length; i++) {
  
        this.addFamilyMember(members[i]);
    }
    this.step = 1;
    this.currentForm = 'new';
    this.setCenterCountries();
    setTimeout(() => {
      if(center_id){
        this.model['center_id'] = center_id;
      }
   
      this.collapseAllMembers();
      if (this.model.members.length > 0) {
        this.model.members[this.getFirstMemberIndex()].open();
      }

      this.updateDistricts();
    }, 1000);


  }

  getFirstMemberIndex(){
    console.log('IS NEW',this.is_new_application);
    if(this.is_new_application){
      return 0;
    }
    let cancelledIndex = this.model.members.findIndex((m:any)=>{
      return m.getFieldValue('status') == 13;
    })
    console.log('Cancelled',cancelledIndex);
    if(cancelledIndex ==-1){
      return 0;
    }

    if(cancelledIndex ==-1){
      return 0;
    }
    return cancelledIndex;
  }


  createNewForm() {
    this.spinner.show();
    this.saveForm().subscribe(res => {
      this.currentForm = 'new';
      this.step = 1;
      this.application_id = res['application_id'];
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      alert('یک مشکل رخ داد. لطفاً دوباره کوشش کنید');
    });

  }

  saveWithMessage() {
    this.spinner.show();
    this.saveForm().subscribe(res => {
      this.spinner.hide();
      this.openFormSavedConfirmation(FormSavedConfirmationComponent);
    }, error => {
      this.spinner.hide();
      alert('یک مشکل رخ داد! لطفاً دوباره کوشش کنید!');
    });
  }


  copyGurantor(query, currentMemberIndex) {

    let current_member_fields_index = this.model.members[currentMemberIndex].getFieldsIndexByName(query);
    for (let i of current_member_fields_index) {
      let groupIndex = current_member_fields_index.groupIndex;
      let fieldIndex = current_member_fields_index.fieldIndex;
      let field = this.model.members[currentMemberIndex][groupIndex]['fields'][fieldIndex];
      if (field.type == 'date') {
        for (let x = 0; x < field.options.length; x++) {
          field.options[x].value = this.model.members[currentMemberIndex - 1][groupIndex]['fields'][fieldIndex].options[x].value;
        }
      } else
        field.value = this.model.members[currentMemberIndex - 1][groupIndex]['fields'][fieldIndex].value;
    }




  }

  getOpenMemberIndex() {
    let index = 0;
    for (let i = 0; i < this.model.members.length; i++) {
      let member = this.model.members[i];
      if (member.collapse) {
        return i;
      }
    }
    return index;
  }



  public convertHeadOfFamilyGregorian() {

    if (this.model.dob_day && this.model.dob_month && this.model.dob_year) {
      this.head_of_family_dob_gregorian = Jalaali.toGregorian(parseFloat(this.model.dob_year), parseFloat(this.model.dob_month), parseFloat(this.model.dob_day));
    }
  }

  public test() {
    alert('test');
  }
  searchForOldApplication() {
    this.currentForm = 'old';
    setTimeout(() => {
      this.searchBox.nativeElement.focus();
    }, 400);
  }

  openStep(step) {
    if (this.step > step) {
      this.step = step;
    }
  }
  selectHeadOfFamilyMaritalStatus(status) {
    this.model['marital_status'] = status;
    for (let m of this.model.members) {
      m.updateRelationships('marital_status', status);
    }
  }

  validateAndAddNewMember() {
   
    let data = this.getModelData();
    this.errorKeys = [];
    let currentMemberIndex = this.getActiveMemberIndex();
    if (currentMemberIndex == -1) {
      return false;
    }
    this.spinner.show();
    this.api.process("/validate?step=3&member=" + currentMemberIndex, data).subscribe(res => {
      this.errors = [];
      this.spinner.hide();
      this.addFamilyMember();
      setTimeout(() => {
        document.getElementById('familymember-' + (currentMemberIndex + 1)).scrollIntoView();
      }, 1000);
    }, error => {
      this.spinner.hide();
      this.errors = error.error.errors;
      this.errorKeys = Object.keys(this.errors);
    });
  }

  uploadFile(event, field, member) {

    let file = < File > event.target.files[0];
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      alert("لطفا تنها فارمت عکس jpg یا png را استفاده کنید. ");
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      field.value = reader.result;

      member.form.get('paper_id_copy_base64').setValue(field.value);
      // member.setValue(field.name,field.value);

    }
  }

  getMemberValues(removeFileAttachments: boolean = false) {
    let result = [];
    for (let member of this.model.members) {
      member.removeFilesIfNotInQueue();
      let memberInfo = member.form.getRawValue();
      if (removeFileAttachments) {
      //  memberInfo['photo'] = "";
       // memberInfo['paper_id_files'] = "";
       // memberInfo['education_documents'] = "";
      }
      result.push(memberInfo);
    }

    return result;
  }


  public getHeadOfFamily() {
    for (let member of this.model.members) {
      if (member.isHeadOfFamily()) {

        return member;
      }
    }

    return false;
  }

  updateRelationships(updatedMember) {

    let headOfFamily = this.getHeadOfFamily();
    if (updatedMember.isHeadOfFamily()) {
      return false;
    }

    for (let member of this.model.members) {

      if (member.isHeadOfFamily() == false) {

        if (headOfFamily) {

          let relationshipField = member.getFieldByName('relationship_with_head_of_family');
          let relationshipValue = member.getFieldValue('relationship_with_head_of_family');
         
          relationshipField.setLanguageOption(this.api, 'relationships', true);
          setTimeout(() => {
            
            member.removeOption('relationship_with_head_of_family', 1);
            member.updateRequiredFiles();
            if (headOfFamily.getFieldValue('marital_status') == 1) {
              member.removeOption('relationship_with_head_of_family', 6);
              member.removeOption('relationship_with_head_of_family', 7);
              member.removeOption('relationship_with_head_of_family', 8);
              member.removeOption('relationship_with_head_of_family', 9);
              member.removeOption('relationship_with_head_of_family', 19);

            }
            if (headOfFamily.getFieldValue('marital_status') == 2) {
              member.removeOption('relationship_with_head_of_family', 2);
              member.removeOption('relationship_with_head_of_family', 3);
              member.removeOption('relationship_with_head_of_family', 4);
              member.removeOption('relationship_with_head_of_family', 5);
            }
            if (headOfFamily.getFieldValue('gender') == 1) {
              member.removeOption('relationship_with_head_of_family', 2);
              member.removeOption('relationship_with_head_of_family', 49);
              member.removeOption('relationship_with_head_of_family', 48);
              member.removeOption('relationship_with_head_of_family', 51);
              member.removeOption('relationship_with_head_of_family', 53);
              member.removeOption('relationship_with_head_of_family', 54);
              member.removeOption('relationship_with_head_of_family', 56);
              // member.setFieldValue('relationship_with_head_of_family', '');
              member.disableField('gender');


            }
            if (headOfFamily.getFieldValue('gender') == 2) {
              member.removeOption('relationship_with_head_of_family', 3);
              member.removeOption('relationship_with_head_of_family', 50);
              member.removeOption('relationship_with_head_of_family', 52);
              member.removeOption('relationship_with_head_of_family', 57);
              member.removeOption('relationship_with_head_of_family', 55);
              member.disableField('gender');

            }
            member.setFieldValue('relationship_with_head_of_family', relationshipValue);
          }, 2000);

        }
      }
    }

  }

  toggleMemberCollapse(index) {
    this.collapseAllMembers();
    this.model.members[index].toggleCollapse();

    this.updateRelationships(this.model.members[index]);
    setTimeout(() => {
      let element = document.getElementById('familymember-' + index);
      element.scrollIntoView();
    }, 1000);


  }
  collapseAllMembers() {
    for (let i = 0; i < this.model.members.length; i++) {
      this.model.members[i].close();
    }
  }

  getActiveMemberIndex() {
    for (let i = 0; i < this.model.members.length; i++) {
      if (this.model.members[i].isActive()) {
   
        return i;
      }
    }

    return 0;
  }

  public addFamilyMember(data ? ) {
    let familyMember = new FamilyMember(this.api, data);

    if (familyMember.isHeadOfFamily() || this.model.members.length == 0) {
      // familyMember.setFieldValue('relationship_with_head_of_family',1);
      familyMember.form.get('relationship_with_head_of_family').setValue(1);
      familyMember.form.get('relationship_with_head_of_family').disable();
      familyMember.removeOption('living_status', 2);
      familyMember.removeOption('living_status', 3);
      familyMember.form.get('living_status').setValue(1);
      familyMember.hideField('apply_for_new_id');
      familyMember.makeVisible('marital_status');
      familyMember.makeVisible('dob');
      if(familyMember.form.get('has_digital_id').value == "0"){
        familyMember.form.get('apply_for_new_id').setValue('بلی');
      }
      
      familyMember.updateRequiredFiles();
      //familyMember.setFieldValue('apply_for_new_id','بلی');


    } else if (this.model.members.length > 0) {
      familyMember.removeOption('relationship_with_head_of_family', 1);
      if (data != undefined) {
        familyMember.setFieldValue('relationship_with_head_of_family', data.relationship_with_head_of_family);
      }
    }

    //familyMember.setFieldValue('paper_id_copy','');
    this.model.members.push(familyMember);
    //this.updateRelationships(familyMember);
    this.toggleMemberCollapse(this.model.members.length - 1);



    this.updateRelationships(this.model.members[this.model.members.length - 1]);
    //this.updateDistricts();
    this.updateCopyFrom();
    return this.model.members[this.model.members.length - 1];
  }
  provinceSelected(event, fieldName, member, memberKey) {
    member.form.get(fieldName + ".province").setValue(event.value);
    
    this.setDistricts(event.value, fieldName, memberKey);

  }

  setDistricts(province, fieldName, memberKey) {
    if(province=='' || province == 'null' ||province == null){
      return false;
    }
    console.log('fieldName',fieldName);
   console.log('PROVINCE',province);
 
   
    
  
    this.spinner.show();
    this.api.process("/searchDistricts?province=" + province, {}, "GET").subscribe((res:any) => {
      let fieldValue = this.model.members[memberKey].getFieldValue(fieldName);
      this.spinner.hide();
      let selectedDistrict=this.model.members[memberKey].getFieldValue(fieldName);
      if(selectedDistrict.hasOwnProperty('district')){
        if( res.indexOf(selectedDistrict.district) == -1){
          selectedDistrict.district="";
          this.model.members[memberKey].setFieldValue(fieldName,selectedDistrict);
        }
       
      }
    
      this.districts[memberKey + fieldName] = res;
     
      //setTimeout(() => {
        this.model.members[memberKey].setFieldValue(fieldName, fieldValue);
        if (typeof (fieldValue) == 'object' && fieldValue.hasOwnProperty('district')) {
           
          if(fieldValue.district!=null && fieldValue.district!=""){

            this.districtSelected({
              value: fieldValue.district
            }, fieldName+".district", this.model.members[memberKey]);
          }
  
        }
     // }, 1000);

    },(error)=>{
      this.spinner.hide();
    });
  }

  getPrintPreviewLink() {
    return this.api.endpoint + '/previewApplication?reference_no=' + this.application_id;
  }

  updateDistricts() {
    
    for (let i = 0; i < this.model.members.length; i++) {
      let m = this.model.members[i];
      for (let f of m.fields)
        if (f.type == 'addressAutocomplete') {
         this.setDistricts(f.value.province, f.name, i);
        }
    }


  }

  validateHeadOfFamilyBirthDay() {
    let headOfFamily = this.getHeadOfFamily();
    if(this.getActiveMemberIndex() != 0){
      return false;
    }
    if (headOfFamily) {
      this.errors['members.0.birthday_year'] = [];
      let day = headOfFamily.form.get('birthday_day').value;
      let month = headOfFamily.form.get('birthday_month').value;
      let year = headOfFamily.form.get('birthday_year').value;
      if (isValidJalaliDate(year, month, day)) {

        let d = Jalaali.toGregorian(parseFloat(year), parseFloat(month), parseFloat(day));

        let dob = moment(d.gy + '/' + d.gm + "/" + d.gd, 'YYYY/M/D');

        let today = moment()
        let duration = moment.duration(today.diff(dob));

        if (duration.asYears() < 18) {
          this.translate.get('invalid_dob_head_of_family').subscribe(val => {
            this.errors['members.0.birthday_year'] = [
              val
            ];
          });

        }

      }

    }
  }
  copyData(from, to, memberKeyFrom,memberKeyTo) {

    let member = this.model.members[memberKeyFrom];
    let value = member.form.get(from).value;

    member = this.model.members[memberKeyTo];
    member.form.get(to).setValue(value);
  
    member.setFieldValue(to, value);
  }

  resetCopyFields(){
    this.fieldKeys={};
    for(let m of this.model.members){
        for( let f of m.fields){
            if(f.copyFrom.hasOwnProperty('name')){
                f.copyFrom.actions=[];
            }
        }
    }
  }
  updateCopyFrom = function () {
    let fieldKeys=this.fieldKeys;
    this.resetCopyFields();
    for (let j=0; j< this.model.members.length;j++) {
      let member = this.model.members[j];
      let fields = member.fields;

    for (let f of fields) {
       
          if (f.copyFrom.hasOwnProperty('name') ) {
          
                      for (let i = 0; i < this.model.members.length; i++) {
                        
                        let m = this.model.members[i];    
                        for (let memberField of m.fields) {  
              
                            var label = "";
                          
                            this.translate.get('copyFrom').subscribe((copyFromText) => {

                              
                      
                              if (f.name == memberField.name && memberField.copyFrom.hasOwnProperty('name')  && fieldKeys.hasOwnProperty(memberField.name+j+i) == false && typeof(m.form.get('name').value) == 'string') {
                              if(memberField.copyFrom.applyToOtherMembers == false && j != i){
                                return false;
                              }
                              if(member.isHeadOfFamily() && f.copyFrom.showInheadOfFamily == false){
                               
                                return false;
                              }
                                this.translate.get(memberField.copyFrom.name).subscribe((val) => {
                                 
                           
                                  if(memberField.type =='date'){
                                
                                      for(let o of memberField.options){
                                        label="";
                                        label += copyFromText + " ";
                                        label += m.form.get('name').value + " " + m.form.get('surname').value;
                                        this.translate.get(o.id).subscribe((optionLabel)=>{
                                          let oVal=m.form.get(o.id).value;
                                          if(oVal && oVal.hasOwnProperty('district') && oVal.district == null){
                                              return false;
                                          }
                                          if(oVal==null || oVal==""){
                                            return false;
                                          }
                                   
                                          label += " "+optionLabel + " ";
                                          f.copyFrom.actions.push({
                                            label: label,
                                            from: o.id,
                                            to: o.id,
                                            memberKeyFrom:i,
                                            memberKeyTo:j
                      
                                          });
                                      
                                        });
                                      }

                                  }else{
                                    label += copyFromText + " ";
                                    label += m.form.get('name').value + " " + m.form.get('surname').value;
                                    label += " "+val + " ";
                                   
                                    f.copyFrom.actions.push({
                                      label: label,
                                      from: memberField.copyFrom.name,
                                      to: memberField.name,
                                      memberKeyFrom:i,
                                      memberKeyTo:j
                
                                    });
                                    if(!member.isHeadOfFamily()){
                                      label="";
                                      this.translate.get(memberField.name).subscribe((selfLabel)=>{
                                        label= copyFromText+" "+m.form.get('name').value + " " + m.form.get('surname').value+" "+selfLabel;
                                      });
                                      f.copyFrom.actions.push({
                                        label: label,
                                        from: memberField.name,
                                        to: memberField.name,
                                        memberKeyFrom:i,
                                        memberKeyTo:j
                  
                                      });
                                    }
                                  }
                            

                                fieldKeys[memberField.name+j+i]=true;
                              });
                              }
                    
                              


                        


                            });

                            

                        

                          }



                        }
               

          }


        

       
        
      


    }
  

  }
}
countrySelected(fieldName,value,member) {

  let field = member.getFieldByName(fieldName);
      let fieldValue=member.form.get(fieldName).value;
     
      fieldValue.country = value;
      member.form.get(fieldName).setValue(fieldValue);
      if(fieldValue == "1"){
          field.provinceType ='auto';
      }else{
          field.provinceType ='manual';
      }
      
} 
public parseArabic(str) {
  
  return Number( str.replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(d) {
      return d.charCodeAt(0) - 1632; // Convert Arabic numbers
  }).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(d) {
      return d.charCodeAt(0) - 1776; // Convert Persian numbers
  }) );
}

public numberToEnglish(event,fieldName,member){
   let field = member.form.get(fieldName);
   let fieldValue = field.value;
   field.setValue(this.toEnglishNumber(fieldValue));
    
}
public toEnglishNumber(val){
  let dariNumbers=[
    {d:'۱',e:1},
    {d:'۲',e:2},
    {d:'۳',e:3},
    {d:'۴',e:4},
    {d:'۵',e:5},
    {d:'۶',e:6},
    {d:'۷',e:7},
    {d:'۸',e:8},
    {d:'۹',e:9},
    {d:'۰',e:0},
  ];
  for( var n of dariNumbers ){
      val = val.replace(n.d,n.e);
  }
  return val;
}


  public getProgress(){
    if(this.step == 1){
      return 2;
    }

    if(this.step == 2){
      return 80;
    }
    if(this.step == 3){
      return 100;
    }
  }
  dateSelected(event,member,fieldName){
    member.setFieldValue(fieldName,event.value == null ? '' : event.value);
    this.datePartChanged(member, fieldName);
    if(fieldName.indexOf('birthday_') === 0){
      this.validateHeadOfFamilyBirthDay();
    }
  }

  daysForDate(member, field) {
    const month = field.options.find(option => /_month$/.test(option.id));
    const year = field.options.find(option => /_year$/.test(option.id));
    return daysInJalaliMonth(year && member.form.get(year.id).value,
      month && member.form.get(month.id).value);
  }

  datePartChanged(member, fieldName) {
    const prefix = fieldName.replace(/_(day|month|year)$/, '');
    const day = member.form.get(prefix + '_day');
    const month = member.form.get(prefix + '_month');
    const year = member.form.get(prefix + '_year');
    if (!day || !month || !year) {
      return;
    }
    const allowed = daysInJalaliMonth(year.value, month.value);
    if (day.value && allowed.indexOf(jalaliNumber(day.value)) === -1) {
      // Ask for the day again instead of silently changing the applicant's date.
      member.setFieldValue(prefix + '_day', '');
      day.markAsTouched();
    }
  }

  mapToPashto=function(e,fieldName,member,lang){
    let field = member.form.get(fieldName);
    let fieldValue = field.value == null ? '' : field.value;
 

      if(lang!='fa'){
        return true;
      }
      var PashtoKeyCodes = {
          220: 'پ', 59: 'ک', 65: 'ش', 66: 'ذ', 67: 'ز', 68: 'ی', 69: 'ث', 70: 'ب', 71: 'ل', 72: 'ا', 73: 'ه', 219: 'چ', 221: 'ج', 222: 'گ', 58: 'ک', 190: 'ږ', 188: 'و', 74: 'ت', 75: 'ن', 76: 'م', 77: 'ړ', 78: 'د', 79: 'خ', 80: 'ح', 81: 'ض', 82: 'ق', 83: 'س', 84: 'ف', 85: 'ع', 86: 'ر', 87: 'ص', 89: 'غ', 88: 'ط', 90: 'ظ', 186: 'ک'
      };
      var NumbersKeyCodes = {
          49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 48: '0', 96: '0', 97: '1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7', 104: '8', 105: '9'
      };
      var SpecialKeyCodes = {
          //48 : ')',57 : '('
      }

      var PashtoKeyCodesShift = {
          65: 'ښ', 66: '‌', 67: 'ژ', 68: 'ي', 69: '', 70: 'پ', 71: 'أ', 72: 'آ', 73: '', 190: '.',
          74: 'ټ', 75: 'ڼ', 76: 'ة', 77: 'ؤ', 78: 'ډ', 79: 'ځ', 80: 'څ', 81: '', 82: '', 83: 'ۍ', 84: '', 85: '', 86: 'ء', 87: '', 89: '', 88: 'ې', 90: 'ئ'
      };

      var charCode = e.keyCode || e.charCode;
     
      if (charCode === 8 || charCode === 32 || charCode === 9 || charCode === 39 || charCode === 37) {
      
          return true;
      }
      else if (e.shiftKey && PashtoKeyCodesShift[charCode]) {
         
              member.setFieldValue(fieldName, fieldValue + PashtoKeyCodesShift[charCode]);
   
          return false;
      }
      else if (PashtoKeyCodes[charCode]) {
    
          member.setFieldValue(fieldName, fieldValue + PashtoKeyCodes[charCode]);
          return false;
      }
      else if (e.shiftKey && SpecialKeyCodes[charCode]) {
      
        member.setFieldValue(fieldName, fieldValue + SpecialKeyCodes[charCode]);
       
          return false;
      }
      else if(NumbersKeyCodes[charCode]){
        member.setFieldValue(fieldName, fieldValue + NumbersKeyCodes[charCode]);
       
          return false;
    }
      else {
     
         
          member.setFieldValue(fieldName, fieldValue + '');
          return false;
      }
 
  }
  openFormSavedConfirmation(content) {
   
    let modal= this.modalService.open(content);
        modal.componentInstance.application_id = this.application_id;
  }

  getAppointments(center_id){
    this.spinner.show();
    this.api.process("/getAppointments?center_id="+center_id,{},"GET").subscribe((res)=>{
      this.spinner.hide();
      this.appointments = res;
      if(this.savedAppointmentDate && center_id == this.savedAppointmentDate.center_id){
          this.appointments.unshift(this.savedAppointmentDate);
      }
      
    },(e)=>{
      this.spinner.hide();
    });
  }
  selectAppointmentDate(a){
    this.appointment_times = a.times;
    this.selectedAppointmentDate=a.month;
    this.model['selectedAppointmentTime']="";
  }
  selectAppointmentTime(a){
      this.model['selectedAppointmentTime'] = a;
  }

  public toMd5(value){
    return Md5.hashAsciiStr(value).toString();
  }

  public validateAndOpen(memberKey){
    this.nextMember(memberKey,false);
  }

  public resetFieldError(key,name){
    let k = 'members.'+key+'.'+name;
 
    if(this.errors!=false &&  k in this.errors){
      this.errors[k]=[];
    }
   
  }
  public getCenterById(id){
    return this.centerNames.filter((c)=>c.id == id);
  }

  private setProvinceList(districts){
    for(let d of districts)
    {
      let existsAlready = this.provinceList.find((p:any)=>{
        if(p == d.province){
          return  true;
        }
      });

      if(existsAlready == undefined){
        this.provinceList.push(d.province);
      }
      
    }

    console.log('provinceLIst',this.provinceList);
  }
}
