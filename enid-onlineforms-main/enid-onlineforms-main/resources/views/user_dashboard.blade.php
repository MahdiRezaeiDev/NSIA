@extends('layouts.admin')

@section('content')
<div class="container">
    <div class="row mt-5">
        <div class="col-md-12">
            <h2>درخواستی های</h2>

        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body bg-warning">
                    <h5 class="card-title"> درخواستی های اخذ تذکره جدید</h5>
                    <p class="dash-number">{{ $individualApplicationsCount }}</p>
                    <a class="btn btn-light btn-block" href="/individual-applications"> معلومات بیشتر...</a>
                </div>
            
            </div>
        </div>
     
      
    </div>

  

</div>
@endsection
