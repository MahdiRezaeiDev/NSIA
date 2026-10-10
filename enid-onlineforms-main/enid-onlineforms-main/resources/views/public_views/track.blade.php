@extends('layouts.app')

@section('content')

<div class="section" style="padding-top:5%" ng-app="publicApp" ng-controller="IndividualFormCtrl">
    <div class="row justify-content-center">
  
            <div class="col-md-12">
                <h4> شماره درخواستی : {{$application->reference_no}} </h4>
            </div>
            <table class="table table-striped">
                <tr>
                    <th>تاریخ</th>
                    <th>پروسه</th>
                </tr>
                @foreach($application->events()->get() as $e)
                <tr>
                    <td>
                        {{$e->date}}
                    </td>
                    <td>
                        {{$e->description}}
                    </td>
                </tr>
                @endforeach
            </table>
    </div>

</div>
@endsection
