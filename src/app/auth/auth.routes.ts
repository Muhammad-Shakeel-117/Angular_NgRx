import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
