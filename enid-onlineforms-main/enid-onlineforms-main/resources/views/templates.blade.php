@extends('layouts.admin')

@section('content')
<div class="container" ng-controller="AppointmentsCtrl" ng-init="getTemplates()" >
    <a href="/admin/template" class="btn btn-primary mt-5"> تمپلیت جدید</a>
    <hr>
    <div class="row">
        <div class="col-md-12">
            <label>جستجو</label>
            <input type="text" class="form-control" ng-model="search">
            <table class="table table-striped mt-5">
                <tr>
                    <th width="80%">نام تمپلیت</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr ng-repeat="template in templates">
                    <td>[[template.name]]</td>
                    
                    <td>
                        <a class="btn btn-primary" href="/admin/template/[[template.id]]"> تصحیح</a>
                    </td>
                    <td>
                        <button class="btn btn-danger" ng-click="deleteTemplate(template.id)"> حذف</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>

</div>
@endsection
