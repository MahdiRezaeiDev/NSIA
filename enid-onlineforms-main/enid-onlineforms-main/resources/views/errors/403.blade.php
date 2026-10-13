@extends('layouts.app')
@section('title', 'دسترسی مجاز نیست')
@section('content')<section class="panel public-message"><div class="metric-number mb-3">403</div><h1>دسترسی مجاز نیست</h1><p>حساب شما اجازهٔ مشاهدهٔ این صفحه را ندارد.</p><a href="/" class="btn btn-primary">برگشت به صفحهٔ اصلی @include('elements.icon', ['name'=>'arrow'])</a></section>@endsection
