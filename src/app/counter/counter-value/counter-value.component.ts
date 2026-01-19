import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CounterState } from '../states/counter.state';
import { getCounter } from '../states/counter.selector';
import { CommonModule } from '@angular/common';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-counter-value',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-value.component.html',
  styleUrl: './counter-value.component.css',
})
export class CounterValueComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  counter$: Observable<number> | null = null;

  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
  }
}
