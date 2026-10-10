@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="row justify-content-center" ng-controller="UsersCtrl" ng-init="Center.getCenters('all');getRoles(); @if(isset($user->id)) setUser({{$user->toJson()}}) @endif">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">معلومات کارمند</div>

                <div class="card-body">
                        <form ng-submit="saveUser()">
                        @csrf

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">اسم </label>

                            <div class="col-md-6">
                                <input  type="text" class="form-control" name="name"  required ng-model="User.name" autocomplete="name" autofocus>

                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('ایمیل') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" ng-model="User.email" required autocomplete="email">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="center" class="col-md-4 col-form-label text-md-right">{{ __('نقش') }}</label>

                            <div class="col-md-6">
                                    <select class="form-control" ng-model="User.role" ng-options=" role for role in roles">
                
                                    </select>
                          
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="center" class="col-md-4 col-form-label text-md-right">{{ __('مرکز') }}</label>

                            <div class="col-md-6">
                                    <select class="form-control" ng-model="User.center_id" ng-options="center.id as center.name for center in Center.tableOptions.data">
                                     
                                    </select>
                          
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="active" class="col-md-4 col-form-label text-md-right">{{ __('فعال') }}</label>

                            <div class="col-md-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="active" id="active1" ng-model="User.active" ng-value="1" checked>
                                    <label class="form-check-label" for="active1">
                                        فعال
                                    </label>
                                </div>
                                <div class="form-check">
                                <input class="form-check-input" type="radio" name="active" id="active2" ng-model="User.active" ng-value="0" checked>
                                <label class="form-check-label" for="active2">
                                   غیر فعال
                                </label>
                            </div>

                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('پاسورد') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password"  ng-model="User.password">

                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('تایید پاسورد') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" ng-model="User.password_confirmation" name="password_confirmation">
                            </div>
                        </div>
                        <div class="alert alert-danger" ng-repeat="e in errors"> [[ e ]] </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button class="btn btn-primary btn-block" type="submit">
                                    {{ __('ثبت') }}
                                </button>
                            </div>
                        </div>
</form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
