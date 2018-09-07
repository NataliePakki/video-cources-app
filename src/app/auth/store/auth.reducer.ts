import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from '../models/user';

export interface State {
  loggedIn: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getErrorMessage = (state: State) => state.errorMessage;

