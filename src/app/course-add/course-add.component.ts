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

constructor(private courseService: CourseService, private route: ActivatedRoute){
  this.courseForm = new FormGroup({ //can be done with formbuilder
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  
  this.route.params.subscribe(params=>{

    let name= params['name']
    console.log(name,"the name")
    if(name){

      this.courseService.GetByName(name).subscribe(course=> {
        console.log(course, "the course")

        if(course){

          this.courseForm.controls['name'].setValue(course.name);
          this.courseForm.controls['type'].setValue(course.type);
          this.courseForm.controls['description'].setValue(course.description);
        }
      });
    }
  } )
}
}
