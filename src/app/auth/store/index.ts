import { ActionReducerMap, createSelector, createFeatureSelector,
    ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromCourses from '../../courses/store/courses/course.reducer';
import * as fromAuthors from '../../courses/store/authors/author.reducer';
import { CourseState } from '../../courses/store/courses/course.state';
import { AuthorState } from '../../courses/store/authors/author.state';


export interface State {
    auth: fromAuth.State;
    courses: CourseState;
    authors: AuthorState;
}
export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    courses: fromCourses.reducer,
    authors: fromAuthors.reducer
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
