import { User } from '../models/user';

export interface State {
    loggedIn: boolean;
    user: User | null;
}
