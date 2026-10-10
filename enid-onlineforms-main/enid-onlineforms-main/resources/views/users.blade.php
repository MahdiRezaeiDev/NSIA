@extends('layouts.admin')

@section('content')
<div class="container" ng-controller="UsersCtrl" ng-init="getUsers(50,1)">
    <div class="row mt-5 mb-5">
        <div class="col-md-10 ">
            <h2>کارمند ها</h2>
        </div>
        <div class="col-md-2">
            <a href="/admin/newUser" class="btn btn-outline-primary float-right btn-block"> <i class="fas fa-plus"></i>
                کارمند جدید</a>
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
    <div class="row mb-5">
        <div class="col-md-12">
            <div id="grid1" ui-grid="tableOptions" class="grid" dir="rtl" ui-grid-selection ui-grid-pagination></div>
        </div>
    </div>

</div>

@endsection
