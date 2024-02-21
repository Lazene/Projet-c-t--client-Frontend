import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseTableComponent } from './course-table/course-table.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:"course", component: CourseAddComponent},
  {path:"course/:name", component: CourseAddComponent},// :name is a parameter
  {path:"course-table", component: CourseTableComponent, canActivate: [authGuard]},
  {path: "login", component: LoginComponent},
  {path: "navbar", component :NavbarComponent},
  {path:"register", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
