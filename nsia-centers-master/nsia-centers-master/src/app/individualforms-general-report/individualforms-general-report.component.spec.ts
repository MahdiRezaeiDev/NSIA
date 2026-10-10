import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualformsGeneralReportComponent } from './individualforms-general-report.component';

describe('IndividualformsGeneralReportComponent', () => {
  let component: IndividualformsGeneralReportComponent;
  let fixture: ComponentFixture<IndividualformsGeneralReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualformsGeneralReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualformsGeneralReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
