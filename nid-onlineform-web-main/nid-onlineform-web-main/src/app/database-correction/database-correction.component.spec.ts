import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCorrectionComponent } from './database-correction.component';

describe('DatabaseCorrectionComponent', () => {
  let component: DatabaseCorrectionComponent;
  let fixture: ComponentFixture<DatabaseCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseCorrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
