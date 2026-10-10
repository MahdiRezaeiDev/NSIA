import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCorrectionComponent } from './id-correction.component';

describe('IdCorrectionComponent', () => {
  let component: IdCorrectionComponent;
  let fixture: ComponentFixture<IdCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdCorrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
