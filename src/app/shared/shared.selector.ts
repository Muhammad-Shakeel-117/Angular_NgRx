import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";
import { SHARED_STATE } from "../constants";

export  const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE);

export const getIsLoading = createSelector(getSharedState, state => state.isLoading);

export const getErrorMessage= createSelector(getSharedState, state => state.errorMessage);