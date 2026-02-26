import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { appReducer } from './store/app.state';
import { AuthEffects } from './auth/states/auth.effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(appReducer),
    provideEffects(AuthEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Production mein logs band
      autoPause: true, // Pauses recording actions and state changes
      trace: true, // Stack trace for actions
      traceLimit: 75, // Stack trace limit
      connectInZone: true, // Zone.js compatible
    }),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
};
