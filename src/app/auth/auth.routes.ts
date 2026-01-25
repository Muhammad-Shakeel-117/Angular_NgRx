import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AUTH_STATE } from '../constants';
import { authReducer } from './states/auth.reducer';
import { provideState } from '@ngrx/store';


export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    providers: [
      provideState(AUTH_STATE, authReducer),
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
