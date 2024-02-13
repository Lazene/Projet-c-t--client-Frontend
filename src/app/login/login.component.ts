import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  
  constructor(private authService: AuthentificationService, private router: Router) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  login(){
    this.authService.login(this.loginForm.value.userName, this.loginForm.value.password)
    .subscribe(response => {
      console.log(response);
      if(response.token){
        sessionStorage.setItem("jwt", response.token);
        this.router.navigate(["/"]);
      }
    });
    
  }
  
}



