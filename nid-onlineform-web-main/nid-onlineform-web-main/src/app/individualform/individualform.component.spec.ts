import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualformComponent } from './individualform.component';

describe('IndividualformComponent', () => {
  let component: IndividualformComponent;
  let fixture: ComponentFixture<IndividualformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
