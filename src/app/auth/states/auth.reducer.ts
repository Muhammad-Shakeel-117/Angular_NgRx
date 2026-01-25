import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { loginSuccess } from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    console.log('Login Success Reducer Called!');
    
    return { ...state, user: action.user };
  }),
);
