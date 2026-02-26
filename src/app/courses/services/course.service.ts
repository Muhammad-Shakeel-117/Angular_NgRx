import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../models/course.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private http: HttpClient,
  ) {}

  createCourse(course: Course): Observable<{ name: string }> {
    const url = `${environments.firebaseConfig.databaseURL}/courses.json`;
    return this.http.post<{ name: string }>(url, course);
  }

  readCourses(): Observable<Course[]> {
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

  updateCourse(course: Course) {
    const courseData = {
      [String(course.id)]: {
        title: course.title,
        description: course.description,
        author: course.author,
        price: course.price,
        image: course.image,
      },
    };
    return this.http.patch(
      `${environments.firebaseConfig.databaseURL}/courses.json`,
      courseData,
    );
  }

  deleteCourse(id: string) {
    return this.http.delete(
      `${environments.firebaseConfig.databaseURL}/courses/${id}.json`,
    );
  }
}
