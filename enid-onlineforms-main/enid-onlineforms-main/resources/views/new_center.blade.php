@extends('layouts.admin')
@section('content')
[[Center.model|json]]
<div class="container" ng-controller="AppointmentsCtrl" ng-init="setTimes({{$times->toJson()}});">
    <div class="row justify-content-center" ng-controller="UsersCtrl"
        ng-init="@if(isset($center->id)) Center.setCenter({{json_encode($center,JSON_UNESCAPED_UNICODE)}}) @endif">
        <div class="col-md-12" ng-init="setTemplate(Center.model.appointments)">
            <div class="card">
                <div class="card-header">معلومات مرکز</div>

                <div class="card-body">
                   
                    <form>
                        @csrf

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">نام مرکز </label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="name" required
                                    ng-model="Center.model.name" autocomplete="name" autofocus>

                            </div>
                        </div>
                    
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">قریه یا ناحیه </label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="village" required
                                    ng-model="Center.model.village" autofocus>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">حالت مرکز </label>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="radio">
                                            <label>
                                            <input type="radio" class="form-control" ng-value="0" name="status" required
                                            ng-model="Center.model.status">
                                            غیر فعال
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="radio">
                                            <label>
                                                <input type="radio" class="form-control" ng-value="1" name="status" required
                                                ng-model="Center.model.status">
                                                فعال
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">تاریخ ملاقات ضروری است؟ </label>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="radio">
                                            <label>
                                            <input type="radio" class="form-control" ng-value="0" name="enable_appointments" required
                                            ng-model="Center.model.enable_appointments">
                                            نخیر
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="radio">
                                            <label>
                                                <input type="radio" class="form-control" ng-value="1" name="enable_appointments" required
                                                ng-model="Center.model.enable_appointments">
                                                بلی
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">ولسوالی </label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="town" required
                                    ng-model="Center.model.town" autofocus>

                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right"> ولایت / شهر </label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="province" required
                                    ng-model="Center.model.province" autofocus>

                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">مملکت </label>
                            <div class="col-md-6">

                                <select ng-model="Center.model.country" class="form-control">
                                    @foreach(\App\Village::getCountries() as $c)
                                    <option value="{{$c->id}}">{{$c->text}}</option>
                                    @endforeach
                                </select>


                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="number_of_days_before_appointment" class="col-md-4 col-form-label text-md-right">تعداد روزها بعدی ملاقات </label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="number_of_days_before_appointment" required
                                    ng-model="Center.model.number_of_days_before_appointment" autofocus>

                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">IP ADDRESS ( کارمند ها تنها
                                میتوانند از این آپی این برنامه را استفاده کنند)</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="ip" required ng-model="Center.model.ip"
                                    autofocus>

                            </div>
                        </div>



                    
                              
                               <div class="row">
                                   <div class="col-md-4">
                                       <label for="fee" class="col-md-4 col-form-label text-md-right">فیس</label>
                                       <input type="text" class="form-control" name="fee" required
                                           ng-model="Center.model.fee" autocomplete="fee" autofocus>
                                   </div>
                                   <div class="col-md-4">
                                       <label for="currency" class="col-md-4 col-form-label text-md-right">واحد پولی</label>
                                        <input type="text" class="form-control" name="currency" required
                                        ng-model="Center.model.currency" autocomplete="currency" autofocus>
                                   </div>
                               </div>
                      
                           
                      
                        <div class="alert alert-danger" ng-repeat="e in Center.errors"> [[ e ]] </div>
                        <div class="row mt-5 mb-5">
                            <div class="col-md-12">
                                <h2>اوقات ملاقات</h2>
                            </div>
                            <div class="col-md-12">
                                <label>انتخاب از تمپلیت</label>
                                <select class="form-control" ng-model="selectedTemplate"
                                    ng-change="setTemplate(selectedTemplate)">
                                    @foreach($templates as $t)
                                    <option value="{{$t->toJson()}}">{{$t->name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        @include('appointment')


                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button class="btn btn-primary btn-block" ng-click="Center.save(model)">
                                    {{ __('ثبت') }}
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>

@endsection
