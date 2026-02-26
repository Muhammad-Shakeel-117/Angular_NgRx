import { Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { provideState } from '@ngrx/store';
import { COURSES_STATE } from '../constants';
import { coursesReducer } from './state/courses.reducer';
import { provideEffects } from '@ngrx/effects';
import { CoursesEffects } from './state/courses.effects';
import { authGuard } from '../auth/services/auth.guard';

export const COURSES_ROUTES: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivate: [authGuard],
    providers: [provideState(COURSES_STATE, coursesReducer), provideEffects(CoursesEffects)],
  },
];
