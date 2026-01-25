import { authReducer } from "../auth/states/auth.reducer";
import { AuthState } from "../auth/states/auth.state";
import { sharedReducer } from "../shared/shared.reducer";
import { SharedState } from "../shared/shared.state";

export interface AppState{
    auth: AuthState,
    shared: SharedState
}

export const appReducer = {
    auth: authReducer,
    shared: sharedReducer
}