import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyformsReportComponent } from './familyforms-report.component';

describe('FamilyformsReportComponent', () => {
  let component: FamilyformsReportComponent;
  let fixture: ComponentFixture<FamilyformsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyformsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyformsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
