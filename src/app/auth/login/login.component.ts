import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { AuthService } from '../services/auth.service';
import { loginStart } from '../states/auth.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private store: Store<AppState>, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    })
  } 

  onLogin(){
    const { email, password } = this.loginForm.value;
    // this.authService.login(email, password).subscribe((response) => {
      
    // })
    
    this.store.dispatch(loginStart({email, password}));
  }

  validateEmail(){
    const emailControl = this.loginForm.get('email');
    if(emailControl?.touched && !emailControl?.valid){
      if(emailControl.errors?.['required']){
        return 'Email is a required field.';
      }
      if(emailControl.errors?.['email']){
        return 'Email is not valid.';
      }
    }
    return '';
  }

  validatePassword(){
    const pswdControl = this.loginForm.get('password');
    if(pswdControl?.touched && !pswdControl?.valid){
      if(pswdControl.errors?.['required']){
        return 'Password is a required field.';
      }
    }
    return '';
  }

}
