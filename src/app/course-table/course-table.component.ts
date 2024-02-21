import { Component } from '@angular/core';
import { CourseService } from '../services/course.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent {

	courses: any;

  constructor(private courseService: CourseService, private router:Router){
//objet router pour naviguer entre les pages
    courseService.Get().subscribe(x=> {
      this.courses=x
    })
  }

  edit(name:string){
    this.router.navigate(['/course', name])
  }

}
