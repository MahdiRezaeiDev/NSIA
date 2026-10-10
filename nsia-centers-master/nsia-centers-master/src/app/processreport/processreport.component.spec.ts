import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessreportComponent } from './processreport.component';

describe('ProcessreportComponent', () => {
  let component: ProcessreportComponent;
  let fixture: ComponentFixture<ProcessreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
