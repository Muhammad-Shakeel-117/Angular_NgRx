import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
signupForm!: FormGroup;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    })
  }

  onSignup(){
    const { email, password } = this.signupForm.value;
    // this.store.dispatch(signupStart({email, password}));
  }


  validateEmail(){
    const emailControl = this.signupForm.get('email');
    if(emailControl?.touched && !emailControl.valid){
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
    const pswdControl = this.signupForm.get('password');
    if(pswdControl?.touched && !pswdControl.valid){
      if(pswdControl.errors?.['required']){
        return 'Password is a required field.';
      }
    }
    return '';
  }
}
