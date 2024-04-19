import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudenntAddComponent } from './student-add.component';

describe('StudenntAddComponent', () => {
  let component: StudenntAddComponent;
  let fixture: ComponentFixture<StudenntAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudenntAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudenntAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
