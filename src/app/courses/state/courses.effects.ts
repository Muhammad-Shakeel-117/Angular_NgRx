import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createCourse,
  createCourseSuccess,
  readCourses,
  readCoursesSuccess,
} from './courses.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CourseService } from '../services/course.service';
import { Course } from '../../models/course.model';
import { setErrorMessage, setIsLoading } from '../../shared/shared.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private store: Store<AppState>,
  ) {}

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCourse),
      mergeMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.courseService.createCourse(action.course).pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const course: Course = { ...action.course, id: data.name };
            return createCourseSuccess({ course });
          }),
          catchError((error) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const message = 'Something went wrong. Course cannot be created.';
            return of(setErrorMessage({ message }));
          }),
        );
      }),
    );
  });

  readCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(readCourses),
      mergeMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.courseService.readCourses().pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({ value: false }));
            return readCoursesSuccess({ courses: data });
          }),
          catchError((error) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const message = 'Something went wrong. Cannot fetch all courses.';
            return of(setErrorMessage({ message }));
          }),
        );
      }),
    );
  });
}
