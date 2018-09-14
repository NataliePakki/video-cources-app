import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
    AuthorActionTypes,
    AuthorsActions
  } from './author.actions';
import { AuthorState } from './author.state';
import * as fromAdapter from './author.adapter';

const initialState: AuthorState = fromAdapter.adapter.getInitialState();

export function reducer(state = initialState, action: AuthorsActions): AuthorState {
    switch (action.type) {
        case AuthorActionTypes.LoadSuccess: {
            return fromAdapter.adapter.addAll(action.payload.authors, state);
        }

        default:
            return state;
    }
}

export const getAuthorState = createFeatureSelector<AuthorState>('authors');

export const selectAuthorIds = createSelector(getAuthorState, fromAdapter.selectAuthorIds);
export const selectAuthorEntities = createSelector(getAuthorState, fromAdapter.selectAuthorEntities);

export const selectAuthor = (id: number) => createSelector(
    selectAuthorEntities,
    courses => courses[id]
  );
export const selectAllAuthors = createSelector(getAuthorState, fromAdapter.selectAllAuthors);
export const authorsCount = createSelector(getAuthorState, fromAdapter.authorsCount);
