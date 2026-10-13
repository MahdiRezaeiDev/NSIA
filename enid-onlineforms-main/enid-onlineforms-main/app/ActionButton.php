<?php
namespace App;
class ActionButton{
    public $label="";
    public $webClass="";
    public $mobileClass="";
    public $webOnClick="";
    public $mobilebOnClick="";


    public function setLabel($label){
        $this->label = $label;
    }

    public function setWebClass($class){
        $this->webClass = $class;
    }   

    public function setMobileClass($class){
        $this->mobileClass = $class;
    }

    public function setWebOnClick($action){
        if (!request()->is('api/*')) {
            if (preg_match('/(?:\?|&)status=4(?:&|$)/', $action)) {
                $this->label = 'تثبیت به اساس آرشیف';
                $action .= '&verification_type=archive&verification_reference_no='.rawurlencode('تثبیت به اساس آرشیف');
            }
            $action .= (strpos($action, '?') === false ? '?' : '&').'_token='.rawurlencode(csrf_token());
        }
        $this->webOnClick = $action;
    }

    public function setMobileOnClick($action){
        $this->mobilebOnClick = $action;
    }
     

}
