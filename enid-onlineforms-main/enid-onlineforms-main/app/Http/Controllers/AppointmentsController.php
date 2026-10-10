<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Appointment;
use App\Http\Requests\NewTemplateRequest;
use App\Center;
class AppointmentsController extends Controller
{
    public function template($id=null){
        $template = null;
        if($id){
            $template = \App\Template::where('id',$id)->first();
            
        }
        return view('new_working_days_template',[
            'days'=>Appointment::days(),
            'months'=>Appointment::months(),
            'years'=>Appointment::years(),
            'times'=>Appointment::times(),
            'template'=>$template
        ]);
    }

    public function saveTemplate(NewTemplateRequest $r){
        $template = new \App\Template;

        if($r->input('id')){
            $template = \App\Template::where('id',$r->input('id'))->first();
        };
        $template->name = $r->input('name');
        $template->data = $r->input('data');
        $template->save();
        return [
            'name'=>$template->name,
            'status'=>'ok'
        ];
    }

    public function templates(){
        return view('templates');
    }

    public function getTemplates(){
        $templates = \App\Template::orderBy('id','desc')->get(['id','name']);

        return $templates;
    }

    public function deleteTemplate(Request $r){
        $id         = $r->input('id');
     
        $template   = \App\Template::where('id',$id)->first();

        if(!$template){
            abort(404);
        }

         if($template->delete()){
             return ['status'=>'ok'];
         }

    }

    public function getAppointments(Request $r){
        $center = Center::where('id',$r->input('center_id'))->first();
        if(!$center){
            return [];
        }
        return  $center->getAvailableAppointments();
    }

    public function getDates(Request $r){
     
        $center_id = $r->user()->center_id;
        $cacheName = $r->user()->getCacheName($r->all());
        $result = \Cache::remember($cacheName,7200,function() use ($r,$center_id){
            $today = \Hijri::now();
            return [
                'today'=>['today_text'=>$today->format('Y-m-d'),'day'=>$today->format('d'),'month'=>$today->format('m'),'year'=>$today->format('Y')],
                'list'=>Appointment::getAppointments($r->user(),'individualforms',$center_id,$r->input('status',false))
            ];
        });
     

        return $result;
    }
}
