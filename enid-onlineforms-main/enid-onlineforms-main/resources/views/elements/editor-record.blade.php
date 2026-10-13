<div class="editor-record">
    <span class="editor-record-icon">@include('elements.icon', ['name'=>$recordIcon])</span>
    <div><span class="editor-kicker">{{ $recordLabel }}</span><h2>{{ $recordTitle }}</h2>@if(!empty($recordEmail))<bdi class="editor-record-meta">{{ $recordEmail }}</bdi>@endif</div>
</div>
