import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledstudentComponent } from './enrolledstudent.component';

describe('EnrolledstudentComponent', () => {
  let component: EnrolledstudentComponent;
  let fixture: ComponentFixture<EnrolledstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrolledstudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrolledstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
