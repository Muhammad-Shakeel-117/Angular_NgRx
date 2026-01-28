import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  createCourse,
  setEditMode,
  setSelectedCourse,
  showForm,
  updateCourse,
} from '../state/courses.action';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getEditMode, getSelectedCourse } from '../state/courses.selector';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent implements OnInit, OnDestroy {
  courseForm!: FormGroup;
  editMode: boolean = false;
  course: Course | null = null;

  editModeSubscription!: Subscription;
  selectedCourseSubscription!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.editModeSubscription = this.store
      .select(getEditMode)
      .subscribe((value) => {
        this.editMode = value;
      });

    this.init();
    this.subscribeToSelectedcourse();
  }

  init() {
    this.courseForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(5000),
      ]),
      author: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      image: new FormControl(null),
    });
  }

  subscribeToSelectedcourse() {
    this.selectedCourseSubscription = this.store
      .select(getSelectedCourse)
      .subscribe((data) => {
        this.course = data;
      });
    if (this.editMode && this.course) {
      this.courseForm.patchValue(this.course);
    } else {
      this.courseForm.reset();
    }
  }

  hideCreateForm() {
    this.store.dispatch(showForm({ value: false }));
  }

  onCreateOrUpdateCourse() {
    
    if (!this.courseForm.valid) {
      return;
    }
    if (this.editMode) {
      const updatedCourse: Course = {
        id: this.course?.id,
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        author: this.courseForm.value.author,
        price: +this.courseForm.value.price,
        image: this.courseForm.value.image,
      };

      this.store.dispatch(updateCourse({ course: updatedCourse }));
    } else {
      
      this.store.dispatch(createCourse({ course: this.courseForm.value }));
    }
    this.store.dispatch(showForm({ value: false }));
    this.store.dispatch(setEditMode({ editMode: false }));
    this.store.dispatch(setSelectedCourse({ course: null }));
  }

  showTitleValidationerrors() {
    const titleControl = this.courseForm.get('title');
    if (titleControl?.touched && !titleControl?.valid) {
      if (titleControl?.errors!['required']) {
        return 'Title is a required field.';
      }
      if (titleControl?.errors!['minlength']) {
        return 'Title must be at least 6 charachters.';
      }
      if (titleControl?.errors!['maxlength']) {
        return 'Title cannot be more than 100 charachters.';
      }
    }
    return '';
  }

  showDescriptionValidationerrors() {
    const descriptionControl = this.courseForm.get('description');
    if (descriptionControl?.touched && !descriptionControl?.valid) {
      if (descriptionControl?.errors!['required']) {
        return 'Description is a required field.';
      }
      if (descriptionControl?.errors!['minlength']) {
        return 'Description must be at least 10 charachters.';
      }
      if (descriptionControl?.errors!['maxlength']) {
        return 'Description cannot be more than 5000 charachters.';
      }
    }
    return '';
  }

  showAuthorValidationerrors() {
    const authorControl = this.courseForm.get('author');
    if (authorControl?.touched && !authorControl?.valid) {
      if (authorControl?.errors!['required']) {
        return 'Author is a required field.';
      }
    }
    return '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileNameSpan = document.querySelector('.file-name');
    if (fileNameSpan && file) {
      fileNameSpan.textContent = file.name;
      this.courseForm.patchValue({ image: file.name });
    }
  }

  ngOnDestroy(): void {
    this.editModeSubscription.unsubscribe();
    this.selectedCourseSubscription.unsubscribe();
  }
}
