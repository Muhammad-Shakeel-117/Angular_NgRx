import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from './environment/environment';
import { appReducer } from './store/app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({}),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Production mein logs band
      autoPause: true, // Pauses recording actions and state changes
      trace: true, // Stack trace for actions
      traceLimit: 75, // Stack trace limit
      connectInZone: true, // Zone.js compatible
    }),
  ],
};
