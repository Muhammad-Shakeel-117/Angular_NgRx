import { Course } from '../../models/course.model';

export interface CoursesState {
  courses: Course[];
  showForm: boolean;
  isEditMode: boolean;
  selectedCourse: Course | null;
}

export const initialState: CoursesState = {
  courses: [
    {
      id: 1,
      title: 'Matering Modern JavaScript',
      description: 'A comprehensive course covering ES6+ Features.',
      image: './assets/images/javascript.jpg',
      author: 'John Doe',
      price: 42,
    },
    {
      id: 2,
      title: 'Angular - From Zero to Hero',
      description:
        'Learn to build robust and single page application using Angular.',
      image: './assets/images/angular.jpg',
      author: 'Jane Smith',
      price: 49,
    },
  ],
  showForm: false,
  isEditMode: false,
  selectedCourse: null,
};
