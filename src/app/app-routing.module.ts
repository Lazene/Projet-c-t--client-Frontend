import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseTableComponent } from './course-table/course-table.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserAddComponent } from './user-add/user-add.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HistoryComponent } from './history/history.component';
import { Option1Component } from './option1/option1.component';
import { Option2Component } from './option2/option2.component';
import { LibraryComponent } from './library/library.component';
import { RulesComponent } from './rules/rules.component';
import { MyCourseComponent } from './my-course/my-course.component';
import { EnrolledstudentComponent } from './enrolledstudent/enrolledstudent.component';
import { CoursesListTeacherComponent } from './courses-list-teacher/courses-list-teacher.component';
import { StudentsListTeacherComponent } from './students-list-teacher/students-list-teacher.component';
import { AssignmentCreateComponent } from './assignment-create/assignment-create.component';
import { AssignmentGradeComponent } from './assignment-grade/assignment-grade.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CourseListComponent } from './student-dashboard/course-list/course-list.component';
import { AssignmentListComponent } from './student-dashboard/assignment-list/assignment-list.component';
import { GradeOverviewComponent } from './student-dashboard/grade-overview/grade-overview.component';
import { NotificationsPanelComponent } from './student-dashboard/notifications-panel/notifications-panel.component';
import { MyAssignmentComponent } from './my-assignment/my-assignment.component';
import { MynoteComponent } from './mynote/mynote.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Route pour la page d'accueil à la racine
  { path: 'about-us', component: AboutUsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'option1', component: Option1Component },
  { path: 'option2', component: Option2Component },
  { path: 'library', component: LibraryComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'my-course', component: MyCourseComponent },
  { path: 'course', component: CourseAddComponent },
  { path: 'course/:name', component: CourseAddComponent },
  { path: 'course-table', component: CourseTableComponent },
  { path: 'course-add', component: CourseAddComponent },
  { path: 'course-add/:id', component: CourseAddComponent },
  { path: 'course-details/:id', component: CourseDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-table', component: UserTableComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'user-add', component: UserAddComponent, canActivate: [authGuard] },
  { path: 'student-add', component: StudentAddComponent },
  { path: 'student-table', component: StudentTableComponent },
  { path: 'student-details/:id', component: StudentDetailsComponent },
  { path: 'enrolled-student/:id', component: EnrolledstudentComponent },
  { path: 'teacher/:teacherId/courses',component: CoursesListTeacherComponent},
  { path: 'students/:courseId', component: StudentsListTeacherComponent },
  { path: 'create-assignment', component: AssignmentCreateComponent },
  { path: 'grade-assignment', component: AssignmentGradeComponent },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent,children: [
      { path: 'courses', component: CourseListComponent },
      { path: 'assignments', component: AssignmentListComponent },
      { path: 'grades', component: GradeOverviewComponent },
      { path: 'notifications', component: NotificationsPanelComponent },
    ],
  },
  { path: 'my-assignment', component : MyAssignmentComponent },
  { path: 'mynote', component: MynoteComponent },
  {path:'change-password',component:ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
