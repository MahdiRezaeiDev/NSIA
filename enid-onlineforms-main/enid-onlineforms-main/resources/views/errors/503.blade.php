@extends('layouts.app')
@section('title', 'سیستم موقتاً در دسترس نیست')
@section('content')<section class="panel public-message"><div class="metric-number mb-3">503</div><h1>سیستم موقتاً در دسترس نیست</h1><p>لطفاً پس از چند لحظه دوباره مراجعه کنید.</p><a href="/" class="btn btn-primary">برگشت به صفحهٔ اصلی @include('elements.icon', ['name'=>'arrow'])</a></section>@endsection
