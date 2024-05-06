import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-grade-overview',
  templateUrl: './grade-overview.component.html',
  styleUrls: ['./grade-overview.component.css']
})
export class GradeOverviewComponent implements OnInit {
  @Input() average: number; 

  constructor(
  ) { }

  ngOnInit() {
    
  }

    }
  

