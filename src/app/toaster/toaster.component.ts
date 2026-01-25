import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setErrorMessage } from '../shared/shared.actions';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css',
})
export class ToasterComponent implements OnInit {
  @Input() errorMessage: string | null = null;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(setErrorMessage({ message: '' }));
    }, 5000);
  }
}
