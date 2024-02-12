import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtIntercept } from './shared/jwt.interceptor';

export function tokenGetter() {
  return sessionStorage.getItem("jwt");
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CourseAddComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    NgbModule,
    JwtModule.forRoot({
      config:{
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
