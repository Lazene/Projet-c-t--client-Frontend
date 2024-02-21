import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../shared/courseModel';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent {
  courseModel: Course;
  courseForm: FormGroup;

  constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router) {
    this.courseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.route.params.subscribe(params => {
      let name = params['name'];
      if(name) {
        this.courseService.GetByName(name).subscribe(course=> {
          if (course) {
            this.courseForm.controls['name'].setValue(course.name);
            this.courseForm.controls['type'].setValue(course.type);
            this.courseForm.controls['description'].setValue(course.description);
          }
        });
      }
    });
  }

  save() {
    console.log(this.courseForm.value);
    this.courseModel = new Course();
    this.courseModel.name = this.courseForm.value.name;
    this.courseModel.type = this.courseForm.value.type;
    this.courseModel.description = this.courseForm.value.description;
    this.courseService.Post(this.courseModel).subscribe(() => {
      // Rediriger vers une autre page après l'ajout du cours
      this.router.navigate(['/course-table']); 
    }, error => {
      console.error('Une erreur s\'est produite lors de l\'ajout du cours :', error);
    
    });
  }
}
