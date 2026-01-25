import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";
import { AUTH_STATE } from "../../constants";

const authFeatureSelector = createFeatureSelector<AuthState>(AUTH_STATE);

export const getLoggedUser = createSelector(
    authFeatureSelector, 
    (state) => {
        return state.user
    }
)

