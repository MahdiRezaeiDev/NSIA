<!DOCTYPE html>
<html lang="en" >

<head>

    <base href="/">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="/css/public.css" rel="stylesheet">
    <link href="/css/c_public.css" rel="stylesheet">
    <link href="/css/admin.css" rel="stylesheet">
    <script type="text/javascript">
    var AUTH_API_TOKEN = ""; 
</script>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
    <script src="/js/app.js"></script>
    <script src="/js/admin.js"></script>
    <script src="https://kit.fontawesome.com/d9949f4a08.js"></script>
    <title> NSIA ONLINE APP </title>
</head>

<body dir="rtl" ng-app="MainApp">
    <div class="p-3  bg-white border-bottom shadow-sm">
    
        <div class="row">
            <div class="col-md-2">
                @if(\Auth::user())
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{\Auth::user()->name}} :
                    {{\Auth::user()->role_in_dari}}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="/changePasswordForm">تغیر پاسورد</a>
                    </div>
                </div>
                @endif
            </div>
            <div class="col-md-6">
                @if(\Auth::user() && \Auth::user()->role == 'admin')
                     @include('elements.admin_nav')
                @endif
            </div>
            <div class="col-md-4">
                 <img src="/img/logo.jpg" style="float:left">
            </div>
        </div>
    </div>
    <div class="container">
        @if(\Auth::user() && \Auth::user()->role != 'admin')
            @include('elements.user_nav')
        @endif
        @yield('content')
    </div>

    <script src="/js/rm.js"></script>
    <script src="/js/admin_custom.js"></script>
</body>
</html>
