import { Component, OnInit, Input } from '@angular/core';
import { AssignmentSubmission } from '../../shared/DTO/assignment-submssionDto';
import { GradeService } from '../../services/grade.service';
import { AssignmentSubmissionService } from '../../services/assignment-submission.service';


@Component({
  selector: 'app-grade-overview',
  templateUrl: './grade-overview.component.html',
  styleUrls: ['./grade-overview.component.css']
})
export class GradeOverviewComponent implements OnInit {
  @Input() assignmentSubmissions: AssignmentSubmission[];

  constructor(
  ) { }

  ngOnInit() {
    
  }

    }
  

