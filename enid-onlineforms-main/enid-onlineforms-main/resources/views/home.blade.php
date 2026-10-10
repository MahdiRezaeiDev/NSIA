@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="row mt-5">
        <div class="col-md-12">
            <h2>درخواستی ها برای تذکره جدید</h2>

        </div>
        @foreach(\App\Individualform::getStatusLabels() as $label)
        <div class="col-md-6">
            <div class="card">
                <div class="card-body" style="background-color:{{$label->color}}!important">
                    <h5 class="card-title">{{$label->description}}</h5>
                    <p class="dash-number">{{\App\Individualform::applied()->where('status',$label->status)->count()}}</p>
                    <a class="btn btn-light btn-block" href="/individual-applications?status={{$label->status}}"> معلومات بیشتر...</a>
                </div>
            
            </div>
        </div>
        @endforeach

      
    </div>




</div>
@endsection
