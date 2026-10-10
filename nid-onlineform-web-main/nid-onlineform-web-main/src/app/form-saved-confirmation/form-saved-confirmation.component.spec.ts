import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSavedConfirmationComponent } from './form-saved-confirmation.component';

describe('FormSavedConfirmationComponent', () => {
  let component: FormSavedConfirmationComponent;
  let fixture: ComponentFixture<FormSavedConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSavedConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSavedConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
