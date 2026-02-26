import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import {
  createCourseSuccess,
  deleteCourseSuccess,
  readCoursesSuccess,
  setEditMode,
  setSelectedCourse,
  showForm,
  updateCourseSuccess,
} from './courses.action';

export const coursesReducer = createReducer(
  initialState,
  on(showForm, (state, action) => {
    return {
      ...state,
      showForm: action.value,
    };
  }),
  on(createCourseSuccess, (state, action) => {
    return {
      ...state,
      courses: [...state.courses, action.course],
    };
  }),
  on(setEditMode, (state, action) => {
    return {
      ...state,
      isEditMode: action.editMode,
    };
  }),
  on(setSelectedCourse, (state, action) => {
    return {
      ...state,
      selectedCourse: action.course,
    };
  }),
  on(updateCourseSuccess, (state, action) => {
    const updCourses = state.courses.map((c) => {
      if (c.id === action.course.id) {
        return action.course;
      } else {
        return c;
      }
    });
    return {
      ...state,
      courses: updCourses,
    };
  }),
  on(deleteCourseSuccess, (state, action) => {
    const updArray = state.courses.filter((cor) => cor.id !== action.id);
    return {
      ...state,
      courses: updArray,
    };
  }),
  on(readCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.courses,
    };
  }),
);
