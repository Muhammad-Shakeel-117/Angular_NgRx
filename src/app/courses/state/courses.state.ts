import { Course } from '../../models/course.model';

export interface CoursesState {
  courses: Course[];
  showForm: boolean;
  isEditMode: boolean;
  selectedCourse: Course | null;
}

export const initialState: CoursesState = {
  courses: [],
  showForm: false,
  isEditMode: false,
  selectedCourse: null,
};
