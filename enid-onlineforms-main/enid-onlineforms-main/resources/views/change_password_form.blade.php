@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="row justify-content-center" ng-controller="UsersCtrl">
        <div class="col-md-8">
        <div class="alert alert-success d-none mt-2" role="alert" id="successMsg">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            پاسورد شما موفقانه تبدیل شد
        </div>
            <div class="card mt-3">
                <div class="card-header">تغییر دادن پاسورد</div>

                <div class="card-body">
                        <form ng-submit="changePassword()">
                        @csrf
                        <!-- {{ method_field('POST') }}  -->
                        <div class="form-group row ">
                            <label for="old password" class="col-md-4 col-form-label text-md-right">{{ __('پاسورد قبلی') }}</label>
                            <div class="col-md-6">
                                <input id="old-password" type="password" class="form-control" name="old_password"  ng-model="UserCredintial.old_password" required>
                                <div ng-if="errors.old_password.length > 0">
                                    <small ng-repeat='error in errors.old_password' class="text-danger">
                                        [[error]] <br/>
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="new password" class="col-md-4 col-form-label text-md-right">{{ __('پاسورد جدید') }}</label>

                            <div class="col-md-6">
                                <input id="new-password" type="password" class="form-control" name="new_password"  ng-model="UserCredintial.new_password" required>
                                <div ng-if="errors.new_password.length > 0">
                                    <small ng-repeat='error in errors.new_password' class="text-danger">
                                        [[error]] <br/>
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="new-password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('تایید پاسورد جدید') }}</label>

                            <div class="col-md-6">
                                <input id="new-password-confirm" type="password" class="form-control" ng-model="UserCredintial.new_password_confirmation" name="new_password_confirmation" required>
                                <div ng-if="errors.new_password_confirmation.length > 0">
                                    <small ng-repeat='error in errors.new_password_confirmation' class="text-danger">
                                        [[error]] <br/>
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button class="btn btn-primary btn-block" type="submit">
                                    {{ __('تغییر') }}
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
