import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../models/course.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  createCourse(course: Course): Observable<{ name: string }> {
    const url = `${environments.firebaseConfig.databaseURL}/courses.json`;
    return this.http.post<{ name: string }>(url, course);
  }

  readCourses() {
    return this.http
      .get<{
        [key: string]: Course;
      }>(`${environments.firebaseConfig.databaseURL}/courses.json`)
      .pipe(
        map((data) => {
          const courses: Course[] = [];
          for (let key in data) {
            const course = { ...data[key], id: key };
            courses.push(course);
          }
          return courses;
        }),
      );
  }
}
