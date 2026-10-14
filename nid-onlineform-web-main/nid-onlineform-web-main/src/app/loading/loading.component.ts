import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  @Input() variant: 'form' | 'section' | 'control' | 'status' = 'section';
  @Input() label = 'loading.form';
  readonly fields = [0, 1, 2, 3, 4, 5];
}
