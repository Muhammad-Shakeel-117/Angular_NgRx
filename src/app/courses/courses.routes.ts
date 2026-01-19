import { Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { provideState } from "@ngrx/store";
import { COURSES_STATE } from "../constants";
import { coursesReducer } from "./state/courses.reducer";

export const COURSES_ROUTES: Routes = [
    {path: '', component: CoursesComponent, providers: [provideState(COURSES_STATE, coursesReducer)]}
];