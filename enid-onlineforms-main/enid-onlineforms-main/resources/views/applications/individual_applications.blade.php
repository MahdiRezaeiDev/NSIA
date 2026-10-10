@extends('layouts.admin')

@section('content')
<div ng-controller="ApplicationsCtrl">

    <div class="container mt-5" ng-init="getIndividualApplications({{$params}});">
        <div class="row">
            <div class="col-md-4">
                <h2>در خواستی های انفرادی</h2>
            </div>

        </div>
        <div class="row">
            @if(\Auth::user()->role == 'admin')
         
                <div class="col-md-3">
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            فلتر به اساس حالت
                        </button>
                        <div class="dropdown-menu">
                            @foreach(\App\Individualform::getStatusLabels() as $label)
                            <button class="dropdown-item"
                                ng-click="getIndividualApplications({ status:{{$label->status}} });">{{$label->description}}</button>
                            @endforeach

                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <button class="btn btn-primary" ng-click="printAppointments()">  <i class="fas fa-print"></i> چاپ</button>
                </div>
                <div class="col-md-3">

                    <div class="btn-group">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            فلتر به اساس مرکز
                        </button>
                        <div class="dropdown-menu">
                        <button class="dropdown-item"
                                ng-click="getIndividualApplications( {center_id:'' });">تمام مراکز</button>
                            @foreach(\App\Center::get() as $label)
                            <button class="dropdown-item"
                                ng-click="getIndividualApplications( {center_id:{{$label->id}} });">{{$label->name}}</button>
                            @endforeach

                        </div>
                    </div>

                </div>

                @endif

                <div class="col-md-3" ng-if="!appointmentDate.enabled">
                    <button class="btn btn-primary" ng-click="appointmentDate.enabled=true">فلتر روز ملاقات</button>
                </div>
                
            <div class="col-md-8 mt-5" ng-if="appointmentDate.enabled">
                <h4>فلتر به اساس روز ملاقات</h4>
                <div class="row">
                    <div class="col-md-2">
                        <label> روز</label>
                        <input type="text" class="form-control" ng-model="appointmentDate.day" maxlength="2">
                    </div>
                    <div class="col-md-2">
                        <label> ماه</label>
                        <input type="text" class="form-control" ng-model="appointmentDate.month" maxlength="2">
                    </div>
                    <div class="col-md-2">
                        <label> سال</label>
                        <input type="text" class="form-control" ng-model="appointmentDate.year" maxlength="4">
                    </div>
                    <div class="col-md-3">
                        <br>
                        <button class="btn btn-primary" ng-click="getIndividualApplications();"> جستجو</button>
                    </div>
                    <div class="col-md-3">
                        <br>
                        <button class="btn btn-danger"
                            ng-click="appointmentDate.enabled=false;getIndividualApplications();"> بستن x</button>
                    </div>
                </div>
            </div>
        </div>


            <div class="row mt-5">
                <div class="col-md-12">

                    <form on-submit="search()">
                        <div class="input-group mb-3">

                            <input type="text" class="form-control" placeholder="جستجو...." aria-label="جستجو"
                                ng-model="searchQuery">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-primary" type="submit" ng-click="search()"> <i
                                        class="fas fa-search"></i> جستجو </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div id="grid1" ui-grid="tableOptions" class="grid" dir="rtl" ui-grid-selection ui-grid-pagination
                ui-grid-resize-columns></div>
        </div>

        @endsection
