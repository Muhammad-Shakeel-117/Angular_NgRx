import { Component, OnInit } from '@angular/core';
import { CourseCardComponent } from './course-card/course-card.component';
import { Course } from '../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getCourses, getShowForm } from './state/courses.selector';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AddCourseComponent } from './add-course/add-course.component';
import { setEditMode, showForm } from './state/courses.action';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCardComponent, CommonModule, AddCourseComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null = null;
  showForm$: Observable<boolean> | null = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(getCourses);
    this.showForm$ = this.store.select(getShowForm);
  }

  showCreateForm() {
    this.store.dispatch(setEditMode({ editMode: false }));

    this.store.dispatch(showForm({ value: true }));
  }
}
