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
            $action .= (strpos($action, '?') === false ? '?' : '&').'_token='.rawurlencode(csrf_token());
        }
        $this->webOnClick = $action;
    }

    public function setMobileOnClick($action){
        $this->mobilebOnClick = $action;
    }
     

}
