import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualformdetailsComponent } from './individualformdetails.component';

describe('IndividualformdetailsComponent', () => {
  let component: IndividualformdetailsComponent;
  let fixture: ComponentFixture<IndividualformdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualformdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualformdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
