import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  deleteCourse,
  setEditMode,
  setSelectedCourse,
  showForm,
} from '../state/courses.action';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent {
  constructor(private store: Store<AppState>) {}

  @Input()
  course: Course | null = null;

  onCourseEdit() {
    this.store.dispatch(setSelectedCourse({ course: this.course }));
    this.store.dispatch(showForm({ value: true }));
    this.store.dispatch(setEditMode({ editMode: true }));
  }

  onDeleteClicked() {
    if (this.course !== null && this.course.id !== undefined) {
      const doDelete = confirm('Do you really want to delete this course?');
      if (doDelete) {
        this.store.dispatch(deleteCourse({ id: this.course.id }));
      }
    }
  }
}
