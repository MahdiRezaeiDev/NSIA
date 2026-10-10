import { FieldOption } from './FieldOption';
import { equal } from 'assert';
import { FormControl } from '@angular/forms';

export class FormField {
    public columnWidth:number       =6;
    public visiblity:boolean        =true;
    public conditions:any           =[];
    public equalsTo:boolean         =true;
    public showButton:boolean       =false;
    public mask:any                 ="0000-0000-00000";
    public is_disabled              =false;
    public hiddenFields             =[];
    public data                     = [];
    public provinceType             = 'auto';
    public copied                   = false;
    public copyFrom:any             = {};
    public lang                     = 'fa';
    public maxLength               = 80;
    public tip                     ='';
    public showConversion          = false;
    public forceShow                = false;
    constructor(public name:string="",public label:string, public type:string="text",public required:boolean=true,public value:any="",public options?:Array<FieldOption>,public placeholder:any=false )
    {
       //super();
        if(!this.placeholder){
            this.placeholder = this.label;
        }
       
    }


    setColumnWidth(size:number){
        this.columnWidth =size;
        return this;
    }

    setVisibility(value:boolean){
        this.visiblity = value;
        return this;
    }

    setCondition(fieldName,fieldValue,equalsTo=true){
        this.conditions.push({name:fieldName,value:fieldValue,equalsTo:equalsTo});
        return this;
    }
  
    isVisible(fields){
        let result=true;
        if(this.forceShow){
            return true;
        }
        for(let i=0;i<this.conditions.length;i++){
            let condition = this.conditions[i];
            if(condition.equalsTo){
                result= result && (condition.value == this.getFieldValue( fields,condition.name ));
            }

            if(!condition.equalsTo){
                result= result && (condition.value != this.getFieldValue( fields,condition.name ));
            }
          

        }
       
        return result;
    }

    columnClass(){
        return 'col-md-'+this.columnWidth;
    }

    setValue(val){
        this.value = val;
        return this;
    }
    getFieldValue(groups,name){
        return this.value;
    }
     setLanguageOption(api,key,reset?){
      
        api.translateService.get(key).subscribe(options=>{
            this.setData(options);
            if(this.options==undefined){
               this.options=[];
            }
            if(reset){
                this.options=[];
            }
            let columnWidth = 12/options.length;
            for(let i=0;i< options.length ;i++){
                let o = options[i];
                this.options.push(new FieldOption('e'+i,o.value,o.label,columnWidth));
            }   
          
          });

          return this;
      }

    updateOptions(options){
        this.options=[];
        if(this.options==undefined){
            this.options=[];
         }
         for(let i=0;i< options.length ;i++){
             let o = options[i];
             this.options.push(new FieldOption('e'+i,o,o));
         }   
    }

    enableButton(){
        this.showButton=true;
        return this;
    }

    setButtonName(name){
      //  this.button_name= name;
        this.enableButton();
        return this;
    }

    setMask(mask){
        this.mask = mask;
        return this;
    }

    enable(){
        this.is_disabled = false;
    }
    disable(){
        this.is_disabled=true;
    }


    setData(data){
        this.data=[];
       for(let d of data){
           this.data.push({id:d.value,text:d.label});
       }
    }

    hideField(name){
      
        this.hiddenFields.push(name);
        return this;
    }
    isHidden(name){
        if(this.forceShow){
            return false;
        }
        return this.hiddenFields.indexOf(name)!=-1;
    }

    setCopyFrom(fields){
        this.copyFrom = fields;
        return this;
    }

    setLang(lang){
        this.lang = lang;
        return this;
    }
    setPlaceholder(val){
        this.placeholder=val;
        return this;
    }
    setMaxLength(length){
        this.maxLength = length;
        return this;
    }
    setTip(tip){
        this.tip = tip;
        return this;
    }

    setShowConversion(val:boolean){
        this.showConversion = val;
        return this;
    }

    makeVisible(){
        this.forceShow =true;
    }

}