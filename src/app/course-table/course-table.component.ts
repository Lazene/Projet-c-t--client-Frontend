import { Component } from '@angular/core';
import { CourseService } from '../shared/course.service';
import { Course } from '../shared/courseModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent {

	courses: any;

  constructor(private courseService: CourseService, private router:Router){

    courseService.Get().subscribe(x=> {
      this.courses=x
    })
  }

  edit(name:string){
    this.router.navigate(['course', name])
  }

}
