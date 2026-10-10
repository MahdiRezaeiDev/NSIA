@extends('layouts.admin')

@section('content')
<div class="container" ng-controller="AppointmentsCtrl" ng-init="setTimes({{$times->toJson()}});">
    <div class="row mt-5 mb-5" @if($template) ng-init="setTemplate({{$template->toJson()}})" @endif>
        <div class="col-md-12">
            <h2>تمپلیت  روز های قرار ملاقات</h2>
        </div>

    </div>
    <div class="row">
        <div class="col-md-12">
            <label>اسم تمپلیت</label>
            <input type="text" ng-model="model.name" name="name" class="form-control">
        </div>
    </div>

    @include('appointment')
    <div class="row mt-3 mb-3">
        <div class="col-md-12 alert alert-danger" ng-repeat="e in errors">[[e]]</div>
    </div>
    <div class="row mt-2 mb-3">
        <div class="col-md-6">
            <button class="btn btn-secondary btn-block" ng-click="saveTemplate()"> ثبت </button>
        </div>
    </div>

</div>
@endsection
