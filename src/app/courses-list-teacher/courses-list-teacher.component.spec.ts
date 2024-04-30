import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListTeacherComponent } from './courses-list-teacher.component';

describe('CoursesListTeacherComponent', () => {
  let component: CoursesListTeacherComponent;
  let fixture: ComponentFixture<CoursesListTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesListTeacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesListTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
