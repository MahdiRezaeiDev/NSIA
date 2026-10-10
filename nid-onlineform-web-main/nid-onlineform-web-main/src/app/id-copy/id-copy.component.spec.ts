import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCopyComponent } from './id-copy.component';

describe('IdCopyComponent', () => {
  let component: IdCopyComponent;
  let fixture: ComponentFixture<IdCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
