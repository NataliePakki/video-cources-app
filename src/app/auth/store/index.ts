import { ActionReducerMap, createSelector, createFeatureSelector,
    ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
export interface State {
    auth: fromAuth.State;
}
export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer
};
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}
export const metaReducers: MetaReducer<State>[] = [logger];

export const getAuthState =
    createFeatureSelector<fromAuth.State>('auth');

export const getUser = createSelector(
    getAuthState,
    fromAuth.getUser
);
export const getLoggedIn = createSelector(
    getAuthState,
    fromAuth.getLoggedIn
);

export const getLoginError = createSelector(
    getAuthState,
    fromAuth.getErrorMessage
);
