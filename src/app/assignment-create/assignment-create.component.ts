import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Course } from '../shared/DTO/CourseDto';
import { AssignmentDTO, AddAssignmentDTO, UpdateAssignmentDTO } from '../shared/DTO/assignmentDto';
import { AuthentificationService } from '../services/authentification.service';
import { TeacherService } from '../services/teacher.service';
import { AssignmentService } from '../services/assignment.service';

@Component({
  selector: 'app-assignment-create',
  templateUrl: './assignment-create.component.html',
  styleUrls: ['./assignment-create.component.css']
})
export class AssignmentCreateComponent implements OnInit {
  courses$: Observable<Course[]>;
  private assignmentsSubject = new BehaviorSubject<AssignmentDTO[]>([]);
  assignments$ = this.assignmentsSubject.asObservable();
  assignmentForm: FormGroup;
  selectedCourseId: number | null = null;
  isEditing: boolean = false;
  currentAssignmentId: number | null = null;

  constructor(
    private authService: AuthentificationService,
    private teacherService: TeacherService,
    private assignmentService: AssignmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadCourses();
  }

  initializeForm() {
    this.assignmentForm = this.fb.group({
      courseId: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  
  loadCourses() {
    const teacherId = this.authService.getUserId();
    if (teacherId) {
      this.courses$ = this.teacherService.getCoursesByTeacher(teacherId);
      this.courses$.subscribe(courses => console.log("Courses loaded:", courses));
    }
}

loadAssignmentsForCourse(courseId: number) {
  this.assignmentService.getAssignmentsByCourseId(courseId).subscribe({
    next: (assignments) => this.assignmentsSubject.next(assignments),
    error: (err) => console.error('Error fetching assignments:', err)
  });
}



onSelectCourse(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  this.selectedCourseId = Number(selectElement.value);
  if (!isNaN(this.selectedCourseId) && this.selectedCourseId > 0) {
    this.loadAssignmentsForCourse(this.selectedCourseId);
  } else {
    console.error('Invalid course ID:', this.selectedCourseId);
    this.assignments$ = of([]); // Réinitialisez les assignments en cas de sélection invalide
  }
}


  

onEdit(assignment: AssignmentDTO) {
  this.isEditing = true;
  this.currentAssignmentId = assignment.assignmentId; // Assurez-vous que c'est `id` et non `assignmentId`, sauf si votre DTO le définit ainsi.
  this.assignmentForm.patchValue({
    courseId: assignment.courseId,
    title: assignment.title,
    description: assignment.description
  });
}


  onSubmit() {
    if (!this.assignmentForm.valid) {
      alert('Please fill all required fields.');
      return;
    }
  
    const formValue = this.assignmentForm.value;
    
    if (this.isEditing && this.currentAssignmentId) {
      const updatedAssignment: UpdateAssignmentDTO = {
        assignmentId: this.currentAssignmentId,
        title: formValue.title,
        description: formValue.description,
        courseId: this.selectedCourseId
      };
      this.updateAssignment(updatedAssignment);
      console.log('Updating assignment:', updatedAssignment);
    } else {
      const newAssignment: AddAssignmentDTO = {
        ...formValue, // Utilisez directement les valeurs du formulaire
        courseId: this.selectedCourseId // Assurez-vous que courseId est défini
      };
      this.addAssignment(newAssignment);
    }
  }
  

  addAssignment(assignment: AddAssignmentDTO) {
    this.assignmentService.addAssignment(assignment).subscribe({
      next: () => {
        alert('Assignment added successfully');
        this.loadAssignmentsForCourse(this.selectedCourseId); // Rechargez la liste des devoirs
        this.resetForm();
      },
      error: (err) => console.error('Failed to add assignment', err)
    });
  }
  
  updateAssignment(assignment: UpdateAssignmentDTO) {
    if (!this.currentAssignmentId) {
      alert("No assignment ID found for updating.");
      return;
    }
    
    this.assignmentService.updateAssignment(this.currentAssignmentId, assignment).subscribe({
      next: () => {
        alert('Assignment updated successfully');
        this.loadAssignmentsForCourse(this.selectedCourseId); // Refresh the assignment list
        this.resetForm();
      },
      error: (err) => console.error('Failed to update assignment', err)
    });
  }
  
  
  onDelete(assignmentId: number) {
    this.assignmentService.deleteAssignment(assignmentId).subscribe({
      next: () => {
        const updatedAssignments = this.assignmentsSubject.value.filter(a => a.assignmentId !== assignmentId);
        this.assignmentsSubject.next(updatedAssignments); // Mettez à jour localement
      },
      error: (err) => console.error('Failed to delete assignment', err)
    });
  }

  resetForm() {
    this.assignmentForm.reset();
    this.isEditing = false;
    this.currentAssignmentId = null;
    this.selectedCourseId = null;
  }
  
}