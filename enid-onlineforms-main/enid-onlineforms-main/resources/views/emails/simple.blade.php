@component('mail::layout',['footer'=>'NSIA'])
    {{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => 'http://127.0.0.1:8000'])

        @endcomponent
    @endslot

<p> 
{{$message}}
</p>

   @slot('footer')
        @component('mail::footer')
             &copy; {{ date('Y') }} NSIA All rights reserved.
        @endcomponent
    @endslot
@endcomponent