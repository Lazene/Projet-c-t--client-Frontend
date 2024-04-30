import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsListTeacherComponent } from './students-list-teacher.component';

describe('StudentsListTeacherComponent', () => {
  let component: StudentsListTeacherComponent;
  let fixture: ComponentFixture<StudentsListTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsListTeacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsListTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
