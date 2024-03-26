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


const routes: Routes = [
  {path:"course", component: CourseAddComponent},
  {path:"course/:name", component: CourseAddComponent},
  {path:"course-table", component: CourseTableComponent, canActivate: [authGuard]},
  { path: 'course-add/:id', component: CourseAddComponent },
  { path: 'course-details/:id', component: CourseDetailsComponent },
  {path: "login", component: LoginComponent},
  {path: "navbar", component :NavbarComponent},
  {path:"register", component: RegisterComponent},
  {path:"user-table", component : UserTableComponent},
  { path: "user-details/:id", component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
