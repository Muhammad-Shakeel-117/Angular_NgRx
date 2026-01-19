import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../states/counter.state';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customIncrement, toggleCustomInput } from '../states/counter.actions';
import { getToggle } from '../states/counter.selector';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
})
export class CustomInputComponent {
  constructor(private store: Store<AppState>) {}
  customValue: number = 0;
  showCustomInput$: Observable<boolean> | null = null;

  ngOnInit() {
    this.showCustomInput$ = this.store.select(getToggle);
  }

  onCustomValueButtonClicked() {
    this.store.dispatch(customIncrement({ value: +this.customValue }));
  }

  onToggleClicked() {
    this.store.dispatch(toggleCustomInput());
  }
}
