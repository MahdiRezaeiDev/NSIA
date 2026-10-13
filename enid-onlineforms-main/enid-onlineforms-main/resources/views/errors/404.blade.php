@extends('layouts.app')
@section('title', 'صفحه یافت نشد')
@section('content')<section class="panel public-message"><div class="metric-number mb-3">404</div><h1>صفحه یافت نشد</h1><p>این آدرس موجود نیست یا صفحه جابه‌جا شده است.</p><a href="/" class="btn btn-primary">برگشت به صفحهٔ اصلی @include('elements.icon', ['name'=>'arrow'])</a></section>@endsection
