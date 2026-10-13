<tbody class="skeleton-body" ng-if="{{ $loadingExpression ?? 'loading' }}" aria-hidden="true">
@for($skeletonRow = 0; $skeletonRow < ($skeletonCount ?? 5); $skeletonRow++)
    <tr class="skeleton-row">
    @foreach($skeletonColumns as $skeletonType)
        <td class="{{ $loop->first ? 'mobile-title' : '' }} {{ $skeletonType === 'wide' ? 'mobile-wide' : '' }} {{ $skeletonType === 'action' ? 'mobile-actions' : '' }}">
        @if($skeletonType === 'avatar')
            <div class="person-cell"><span class="skeleton skeleton-avatar"></span><div class="skeleton-copy"><span class="skeleton skeleton-line"></span><span class="skeleton skeleton-line skeleton-short"></span></div></div>
        @elseif($skeletonType === 'action')
            <span class="skeleton skeleton-button"></span>
        @else
            <span class="skeleton skeleton-label"></span>
            <span class="skeleton {{ $skeletonType === 'badge' ? 'skeleton-badge' : 'skeleton-line' }} {{ $skeletonType === 'wide' ? 'skeleton-wide' : '' }}"></span>
            @if($skeletonType === 'title')<span class="skeleton skeleton-line skeleton-short"></span>@endif
        @endif
        </td>
    @endforeach
    </tr>
@endfor
</tbody>
