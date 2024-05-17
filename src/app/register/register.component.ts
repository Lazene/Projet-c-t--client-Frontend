import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm : FormGroup;

  constructor(private authService: AuthentificationService,private router: Router) {    
    this.registerForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });}

  submit() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.register(this.registerForm.value.userName, this.registerForm.value.password).subscribe(
      response => {
        this.router.navigate(['/login'])
      },
    );
  
  }
}
  
  
