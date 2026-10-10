import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualformsReportComponent } from './individualforms-report.component';

describe('IndividualformsReportComponent', () => {
  let component: IndividualformsReportComponent;
  let fixture: ComponentFixture<IndividualformsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualformsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualformsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
