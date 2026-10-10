@extends('layouts.admin')

@section('content')
<div ng-controller="ApplicationsCtrl" ng-init="application_reference_no={{$application->reference_no}};Note.setReferenceNo('{{$application->reference_no}}','individualform')">
    <style>
        td {
           
            padding: 0px;
            padding-right: 5px;
        }

    </style>
    <div class="row mt-5 mb-5">
 
        <div class="col-md-4">
            @if($application->status < 13) @foreach($application->getActions() as $action)
                @if($application->status == 6)
                <button class="btn btn-dark" style="font-weight:bold;font-size:120%;"
                    onclick="alert('لطفا شماره تذکره الکترونیک را تایپ کنید!')"
                    ng-show="!isValidIdNumber()">
                    <i class="fas fa-arrow-circle-left"></i>
                    {{$action->label}}
                </button>
                @endif
                <a class="{{$action->webClass}}" style="font-weight:bold;font-size:120%;"
                    @if($application->status == 6) ng-show="isValidIdNumber()" @endif
                 href="{{$action->webOnClick.'&rm_appliction_id='}}[[getRmApplicationId()]]">
                    <i class="fas fa-arrow-circle-left"></i>

                    {{$action->label}}
                </a>
                @endforeach
                @endif
        </div>
        <div class="col-md-6">
        
            @if($application->status == 6)
                <label> شماره فورم تذکره جدید </label>
                <div class="row">
                    <div class="col-md-4">
                        <input type="text" maxlength="5" class="form-control" tabindex="3" ng-model="rm_application_no_3" placeholder="00000">
                    </div>
                    <div class="col-md-4">
                    <input type="text" maxlength="4" class="form-control" tabindex="2" ng-model="rm_application_no_2" placeholder="0000">
                    </div>
                    <div class="col-md-4">  
                        <input type="text" maxlength="4" class="form-control" tabindex="1" ng-model="rm_application_no_1" placeholder="1398">
                    </div>
                </div>
          
          

            @endif
        </div>
        <div class="col-md-2">
            <div class="mb-2">
                @if($application->status!=13)
                <button class="btn btn-danger float-right" style="font-weight:bold;font-size:120%;"
                    ng-click="cancelApplication('{{$application->reference_no}}')">
                    <i class="fas fa-arrow-circle-left"></i>
                    لغو گردد
                </button>
                @endif

            </div>
        </div>
        <div class="card-header">
            <div class="btn-group btn-justify">
                <a class="btn btn-outline-primary" target="_blank" href="/print-individual-form?reference_no={{$application->family_form_reference_no}}&individual_reference_no={{$application->reference_no}}">
                    <i class="fas fa-print"></i>
                 پرنت مکمل 
                </a>
             



                <a href="/individual-applications" class="btn btn-outline-primary"> برگشت به لست درخواست ها
                    <i class="fas fa-chevron-left"></i>
                </a>
            </div>
        </div>
    </div>
    <h5 style="border:1px solid black;padding:10px">درخواستی {{$application->name}} {{$application->surname}} ولد {{$application->father_name}} {{$application->father_surname}}</h5>
    <div class="alert alert-info">
       
        <h6> حالت فعلی: {{$application->getStatusDescription($application->status)}}  </h6>

    </div>
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <button ng-class="{'nav-link':true,active:tab == 1}" ng-click="tab=1">معلومات درخواستی</button>
        </li>
        <li class="nav-item">
            <button ng-class="{'nav-link':true,active:tab== 2}" ng-click="tab=2">معلومات پروسه درخواستی</button>
        </li>

    </ul>

    <div class="row justify-content-center" ng-show="tab == 1">
        <div class="col-md-12 mt-3 mb-3">
            <h4>فورم فامیلی </h4>
        </div>
        <div class="col-md-12">

            @include('./public_views/print_family_form',['form'=>$application,
            'members'=>$application->familyMembers()->get(),
            'loadCss'=>false])
            <hr>
            @include('./public_views/print_individual_form',['review'=>$application,'loadCss'=>false])

          
        </div>
    </div>
    <div class="row mt-5">
    <div class="col-md-12">
        <h3>ضمایم</h3>

    
    </div>
        
        <div id="attachments" class="row">
            <?php
            try{
                foreach($application->attachmentsToBase64() as $img):
            ?>
        
                    <div class="col-md-3"><img src="data:image/jpg;base64,{{$img}}" alt="Picture 1" class="img-thumbnail"></div>
            <?php
                endforeach;
            }
            catch(\Exception $e){

            }
            ?>


        
        </div>
       

    
    </div>
    <div class="row mt-5" id="notes">
        <div class="col-md-10">
            <h4> یادداشت جدید </h4>
            <textarea ng-model="Note.model.note" rows="3" class="form-control" placeholder="یادداشت را اینجا تایپ نمایید"></textarea>
            
          
            <div class="alert alert-danger" ng-repeat="e in Note.errors">
                [[e]]
            </div>
        </div>
        <div class="col-md-2">
            <button class="btn btn-primary btn-block mt-5" ng-click="Note.save()"> ثبت</button>
        </div>
        <div class="col-md-12 mt-5">
            <h4 class="mt-5">لست یادداشت ها</h4>
           <table class="table table-striped table-dark">
                <thead>
                <tr>
                    <th width="10%">تاریخ</th>
                    <th>یادداشت</th>
                    <th width="10%">اسم کارمند</th>
                </tr>
                </thead>
                <tr ng-repeat="n in Note.notes">
                    <td>[[n.created_on]]</td>
                    <td>[[n.note]]</td>
                    <td>[[n.username]]</td>
                </tr>
           </table>
        </div>


    </div>
    <div class="row justify-content-center" ng-show="tab == 2">
        <div class="col-md-12">
            <table class="table table-striped">
                <tr>
                    <th>تاریخ</th>
                    <th>پروسه</th>
                    <th>زمان</th>
                    <th>کارمند</th>
                </tr>
                @foreach($application->events()->get() as $e)
                <tr>
                    <td>
                        {{$e->date}}
                    </td>
                    <td>
                        {{$e->description}}
                    </td>
                    <td>
                        {{$e->timeTaken}}
                    </td>
                    <td>
                        {{$e->username()}}
                    </td>

                </tr>
                @endforeach
            </table>
        </div>
    </div>
    </div>

    <script type="text/javascript">
        const gallery = new Viewer(document.getElementById('attachments'));
    </script>
@endsection

