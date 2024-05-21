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
import { NotificationComponent } from './notification/notification.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Route pour la page d'accueil à la racine
  { path: 'about-us', component: AboutUsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'option1', component: Option1Component },
  { path: 'option2', component: Option2Component },
  { path: 'library', component: LibraryComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'my-course', component: MyCourseComponent, canActivate :[authGuard], data: {roles:['student','teacher']}},
  { path: 'course', component: CourseAddComponent,canActivate :[authGuard], data: {roles:['admin']} },
  { path: 'course/:name', component: CourseAddComponent,canActivate :[authGuard], data: {roles:['admin']} },
  { path: 'course-table', component: CourseTableComponent,canActivate :[authGuard], data: {roles:['admin', 'teacher']} },
  { path: 'course-add', component: CourseAddComponent ,canActivate :[authGuard], data: {roles:['admin', 'teacher']}},
  { path: 'course-add/:id', component: CourseAddComponent,canActivate :[authGuard], data: {roles:['admin']} },
  { path: 'course-details/:id', component: CourseDetailsComponent,canActivate :[authGuard], data: {roles:['admin']}},
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-table', component: UserTableComponent,canActivate :[authGuard], data: {roles:['admin']} },
  { path: 'user-details/:id', component: UserDetailsComponent,canActivate :[authGuard], data: {roles:['admin']} },
  { path: 'user-add', component: UserAddComponent, canActivate :[authGuard], data: {roles:['admin']}},
  { path: 'student-add', component: StudentAddComponent,canActivate :[authGuard], data: {roles:['admin']} },
  { path: 'student-table', component: StudentTableComponent,canActivate :[authGuard], data: {roles:['admin']} },
  { path: 'student-details/:id', component: StudentDetailsComponent,canActivate :[authGuard], data: {roles:['admin']} },
  { path: 'enrolled-student/:id', component: EnrolledstudentComponent, canActivate :[authGuard], data: {roles:['admin']} },
  { path: 'teacher/:teacherId/courses',component: CoursesListTeacherComponent,canActivate :[authGuard], data: {roles:['teacher']} },
  { path: 'students/:courseId', component: StudentsListTeacherComponent,canActivate :[authGuard], data: {roles:['admin']} },
  { path: 'create-assignment', component: AssignmentCreateComponent, canActivate :[authGuard], data: {roles:['teacher']}  },
  { path: 'grade-assignment', component: AssignmentGradeComponent, canActivate :[authGuard], data: {roles:['teacher']}  },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent,canActivate :[authGuard], data: {roles:['teacher']} },
  { path: 'student-dashboard', component: StudentDashboardComponent,canActivate :[authGuard], data: {roles:['student']},children: [
      { path: 'courses', component: CourseListComponent },
      { path: 'assignments', component: AssignmentListComponent },
      { path: 'grades', component: GradeOverviewComponent },
      { path: 'notifications', component: NotificationsPanelComponent },
    ],
  },
  { path: 'my-assignment', component : MyAssignmentComponent,canActivate :[authGuard], data: {roles:['student']} },
  { path: 'mynote', component: MynoteComponent,canActivate :[authGuard], data: {roles:['student']} },
  {path:'change-password',component:ChangePasswordComponent},
  {path:'student-listTeacher',component:StudentsListTeacherComponent,canActivate :[authGuard], data: {roles:['teacher']}},
  {path:'notification',component:NotificationComponent,canActivate :[authGuard], data: {roles:['admin']}},
  {path:'admin-dashboard', component: AdminDashboardComponent,canActivate :[authGuard], data: {roles:['admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
