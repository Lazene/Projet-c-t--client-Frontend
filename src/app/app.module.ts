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

export function tokenGetter() {return sessionStorage.getItem("jwt");}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CourseAddComponent,
    CourseTableComponent,
    LoginComponent,
    RegisterComponent,

    
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
