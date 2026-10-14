import { Component, Input } from '@angular/core';
@Component({ selector:'app-page-skeleton', templateUrl:'./page-skeleton.component.html', styleUrls:['./page-skeleton.component.css'] })
export class PageSkeletonComponent {
  @Input() variant = 'table';
  @Input() label = 'در حال دریافت معلومات…';
  readonly items = [0,1,2,3,4];
}
