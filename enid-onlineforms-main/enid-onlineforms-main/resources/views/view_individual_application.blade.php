@extends('layouts.admin')
@section('title', 'بررسی درخواستی')
@section('description', 'معلومات متقاضی، اسناد ضمیمه و جریان رسیدگی به درخواستی.')
@section('actions')<a href="/individual-applications" class="btn btn-secondary">برگشت به درخواستی‌ها @include('elements.icon', ['name'=>'arrow'])</a><a class="btn btn-primary" target="_blank" rel="noopener" href="/print-individual-form?reference_no={{$application->family_form_reference_no}}&individual_reference_no={{$application->reference_no}}">@include('elements.icon', ['name'=>'print']) چاپ فورم مکمل</a>@endsection
@section('content')
<div ng-controller="ApplicationsCtrl" ng-init="application_reference_no='{{$application->reference_no}}'; Note.setReferenceNo('{{$application->reference_no}}','individualform')">
    <section class="panel"><div class="panel-body application-summary"><div><h2>{{$application->name}} {{$application->surname}}</h2><p>ولد {{$application->father_name}} {{$application->father_surname}} <span class="muted">·</span> نمبر درخواستی: <bdi>{{$application->reference_no}}</bdi></p></div><span class="badge-status {{ $application->status == 13 ? 'danger' : ($application->status == 0 ? 'warning' : '') }}">{{$application->getStatusDescription($application->status)}}</span></div>
        @if($application->status == 6)
        <div class="form-section"><h2>نمبر فورم تذکرهٔ جدید</h2><p>سه بخش نمبر فورم را به ترتیب وارد کنید.</p><div class="holiday-fields" dir="ltr"><div class="form-field"><label for="rm-part-1">بخش اول</label><input id="rm-part-1" type="text" class="form-control" inputmode="numeric" maxlength="4" ng-model="rm_application_no_1" placeholder="1398"></div><div class="form-field"><label for="rm-part-2">بخش دوم</label><input id="rm-part-2" type="text" class="form-control" inputmode="numeric" maxlength="4" ng-model="rm_application_no_2" placeholder="0000"></div><div class="form-field"><label for="rm-part-3">بخش سوم</label><input id="rm-part-3" type="text" class="form-control" inputmode="numeric" maxlength="5" ng-model="rm_application_no_3" placeholder="00000"></div></div></div>
        @endif
        @if($application->status < 13)
        <div class="form-actions application-actions">
            @foreach($application->getActions() as $action)
            @if($application->status == 6)<button class="btn btn-primary" type="button" ng-show="!isValidIdNumber()" disabled>{{$action->label}}</button>@endif
            <a class="btn btn-primary" @if($application->status == 6) ng-show="isValidIdNumber()" @endif href="{{$action->webOnClick.'&rm_appliction_id='}}[[getRmApplicationId()]]">@include('elements.icon', ['name'=>'check']) {{$action->label}}</a>
            @endforeach
            <button class="btn btn-danger" type="button" ng-click="cancelApplication('{{$application->reference_no}}')" ng-disabled="actionProcessing">لغو درخواستی</button>
        </div>
        @endif
        <div class="feedback error" ng-if="actionError" role="alert" ng-cloak>[[actionError]]</div>
    </section>
    <section class="panel"><nav class="tabs" aria-label="بخش‌های درخواستی"><button type="button" ng-class="{active:tab===1}" ng-click="tab=1" ng-attr-aria-pressed="[[tab===1]]">معلومات و فورم‌ها</button><button type="button" ng-class="{active:tab===2}" ng-click="tab=2" ng-attr-aria-pressed="[[tab===2]]">اسناد ضمیمه</button><button type="button" ng-class="{active:tab===3}" ng-click="tab=3" ng-attr-aria-pressed="[[tab===3]]">یادداشت‌ها</button><button type="button" ng-class="{active:tab===4}" ng-click="tab=4" ng-attr-aria-pressed="[[tab===4]]">جریان رسیدگی</button></nav>
        <div ng-show="tab===1"><div class="section-head"><div><h2>فورم فامیلی و انفرادی</h2><p>برای دریافت نسخهٔ قابل چاپ، از دکمهٔ «چاپ فورم مکمل» استفاده کنید.</p></div></div><div class="document-scroll" role="region" aria-label="پیش‌نمایش فورم‌ها" tabindex="0"><div class="document-preview">
            @php
                // The PDF templates use disk paths. Only their browser preview needs public image URLs.
                $familyPreview = view('public_views.print_family_form', ['form'=>$application, 'members'=>$application->familyMembers()->get(), 'loadCss'=>false])->render();
                $individualPreview = view('public_views.print_individual_form', ['review'=>$application, 'loadCss'=>false])->render();
            @endphp
            {!! str_replace('src="'.e(public_path()).'/img/', 'src="/img/', $familyPreview) !!}
            <div class="section-divider"></div>
            {!! str_replace(['src="'.e(public_path()).'/img/', 'src=""'], ['src="/img/', 'src="/img/placeholder.jpg" alt="عکس موجود نیست"'], $individualPreview) !!}
        </div></div></div>
        <div ng-show="tab===2" ng-cloak><div class="section-head"><div><h2>اسناد ضمیمه</h2><p>برای مشاهدهٔ واضح‌تر، روی تصویر کلیک کنید.</p></div></div><div class="panel-body">
            @php
                $attachments = []; $attachmentError = false;
                try { $attachments = $application->attachmentsToBase64(); }
                catch (\Exception $exception) { $attachmentError = true; }
            @endphp
            @if($attachmentError)<div class="feedback error" role="alert">دریافت اسناد ضمیمه ممکن نشد. صفحه را دوباره باز کنید.</div>@endif
            <div class="attachments-grid" id="attachments">@forelse($attachments as $image)<img src="data:image/jpg;base64,{{$image}}" alt="سند ضمیمهٔ {{$loop->iteration}}" tabindex="0" role="button" aria-label="بزرگ‌کردن سند ضمیمهٔ {{$loop->iteration}}">@empty @if(!$attachmentError)<div class="empty-state">سند ضمیمه‌ای برای نمایش موجود نیست.</div>@endif @endforelse</div>
        </div></div>
        <div ng-show="tab===3" ng-cloak><div class="section-head"><div><h2>یادداشت‌های کارمندان</h2><p>معلومات تکمیلی مربوط به بررسی این درخواستی.</p></div></div><div class="panel-body"><form class="notes-form" ng-submit="Note.save()"><div class="form-field"><label for="application-note">یادداشت جدید</label><textarea id="application-note" class="form-control" rows="3" ng-model="Note.model.note" required placeholder="یادداشت خود را اینجا بنویسید…"></textarea></div><button type="submit" class="btn btn-primary" ng-disabled="Note.processing || !Note.model.note">[[Note.processing ? 'در حال ثبت…' : 'ثبت یادداشت']]</button></form><div class="feedback error" ng-if="hasErrors(Note.errors)" role="alert"><p ng-repeat="error in Note.errors">[[error.join ? error.join('، ') : error]]</p></div></div>
            <div class="table-wrap" tabindex="0" role="region" aria-label="یادداشت‌های ثبت‌شده"><table class="data-table"><thead><tr><th scope="col">تاریخ</th><th scope="col">یادداشت</th><th scope="col">کارمند</th></tr></thead><tbody><tr ng-repeat="note in Note.notes"><td><bdi>[[note.created_on]]</bdi></td><td class="wrap-cell">[[note.note]]</td><td>[[note.username]]</td></tr><tr ng-if="!Note.notes.length"><td colspan="3" class="empty-cell">هنوز یادداشتی ثبت نشده است.</td></tr></tbody></table></div>
        </div>
        <div ng-show="tab===4" ng-cloak><div class="section-head"><div><h2>جریان رسیدگی به درخواستی</h2><p>مراحل طی‌شده و کارمندان مربوط.</p></div></div><div class="table-wrap" role="region" aria-label="مراحل درخواستی" tabindex="0"><table class="data-table"><thead><tr><th scope="col">تاریخ</th><th scope="col">مرحله</th><th scope="col">مدت زمان</th><th scope="col">کارمند</th></tr></thead><tbody>@forelse($application->events()->get() as $event)<tr><td><bdi>{{$event->date}}</bdi></td><td class="wrap-cell">{{$event->description}}</td><td>{{$event->timeTaken}}</td><td>{{$event->username()}}</td></tr>@empty<tr><td colspan="4" class="empty-cell">هنوز مرحله‌ای ثبت نشده است.</td></tr>@endforelse</tbody></table></div></div>
    </section>
</div>
@endsection
@push('scripts')
<script>
(function () {
    var attachments = document.getElementById('attachments');
    if (attachments && attachments.querySelector('img') && window.Viewer) {
        new Viewer(attachments);
        attachments.addEventListener('keydown', function (event) {
            if (event.target.tagName === 'IMG' && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); event.target.click(); }
        });
    }
}());
</script>
@endpush
