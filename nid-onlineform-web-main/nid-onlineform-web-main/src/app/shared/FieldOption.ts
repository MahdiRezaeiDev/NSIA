export class FieldOption{
    public tip:string="";
    public icon:any=false;
    public type:any="text";
    public mask:any=false;
    public lang='fa';
    public placeholder="";
    public maxLength:number=50;
    constructor(public id:string="",public value:any="",public label:string="",public columnWidth:number=4){

    }
    contains(q){
        return this.id.indexOf(q) !==-1;
    }

    setColumnWidth(size:number){
        this.columnWidth = size;
        return this;
    }

    setValue(val){
        this.value= val;
    }
    setTip(tip){
        tip.subscribe(val=>{
            this.tip = val;
        });
        return this;
    }


    setIcon(name){
        this.icon = name;
        return this;
    }
    setLabel(label){
        label.subscribe(l=>{
            this.label = l;
        });
        return this;
    }

    setType=function(type){
        this.type = type;
        return this;
    }
    setMask=function(mask){
        this.mask = mask;
        return this;
    }
    setMaxLength(max){ 
        this.maxLength = max;
        return this;
    }
    setLang(lang){
        this.lang=lang;
        return this;
    }
    setPlaceholder(val){
        this.placeholder=val;
        return this;
    }
} 