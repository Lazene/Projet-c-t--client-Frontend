import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseTableComponent } from './course-table/course-table.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtIntercept} from './shared/jwt.interceptor';
import { RegisterComponent } from './register/register.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserTableComponent } from './user-table/user-table.component';
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

export function tokenGetter() {return sessionStorage.getItem("jwt");}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CourseAddComponent,
    CourseTableComponent,
    LoginComponent,
    RegisterComponent,
    CourseDetailsComponent,
    UserDetailsComponent,
    UserTableComponent,
    UserAddComponent,
    StudentAddComponent,
    StudentTableComponent,
    StudentDetailsComponent,
    HomeComponent,
    AboutUsComponent,
    HistoryComponent,
    Option1Component,
    Option2Component,
    LibraryComponent,
    RulesComponent,
    MyCourseComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })

  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : jwtIntercept, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
