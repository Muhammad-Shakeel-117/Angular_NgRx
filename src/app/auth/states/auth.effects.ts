import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setErrorMessage, setIsLoading } from '../../shared/shared.actions';
@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const loggedUser = this.authService.formatUserData(data);
            this.authService.saveUserToLocalStorage(loggedUser);
            return loginSuccess({ user: loggedUser });
          }),
          catchError((errorResponse) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const errorMessage =
              this.authService.getErrorMessage(errorResponse);
            return of(setErrorMessage({ message: errorMessage }));
          }),
        );
      }),
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.authService.signup(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const signedUser = this.authService.formatUserData(data);
            this.authService.saveUserToLocalStorage(signedUser);
            return signupSuccess({ user: signedUser });
          }),
          catchError((errorResponse) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const errorMessage =
              this.authService.getErrorMessage(errorResponse);
            return of(setErrorMessage({ message: errorMessage }));
          }),
        );
      }),
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          console.log('Login Success Effect Called!');

          this.router.navigate(['/']);
        }),
      );
    },
    { dispatch: false },
  );
}
