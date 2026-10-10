import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualformConfirmationComponent } from './individualform-confirmation.component';

describe('IndividualformConfirmationComponent', () => {
  let component: IndividualformConfirmationComponent;
  let fixture: ComponentFixture<IndividualformConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualformConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualformConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
