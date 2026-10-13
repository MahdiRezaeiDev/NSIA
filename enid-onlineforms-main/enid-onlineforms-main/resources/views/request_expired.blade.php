@extends('layouts.app')
@section('title', 'پایان اعتبار درخواست')
@section('content')<section class="panel public-message">@include('elements.icon', ['name'=>'clock'])<h1>اعتبار این درخواست پایان یافته است</h1><p>لطفاً به صفحهٔ اصلی برگردید و دوباره کوشش کنید.</p><a href="/" class="btn btn-primary">برگشت به صفحهٔ اصلی @include('elements.icon', ['name'=>'arrow'])</a></section>@endsection
