@extends('layouts.app')
@section('title', 'درخواست‌ها بیش از حد مجاز است')
@section('content')<section class="panel public-message"><div class="metric-number mb-3">429</div><h1>درخواست‌ها بیش از حد مجاز است</h1><p>کمی صبر کنید و سپس دوباره کوشش نمایید.</p><a href="/" class="btn btn-primary">برگشت به صفحهٔ اصلی @include('elements.icon', ['name'=>'arrow'])</a></section>@endsection
