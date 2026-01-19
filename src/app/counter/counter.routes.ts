import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { provideState } from '@ngrx/store';
import { COUNTER_STATE } from '../constants';
import { counterReducer } from './states/counter.reducer';

export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: CounterComponent,
    providers: [provideState(COUNTER_STATE, counterReducer)],
  },
];
