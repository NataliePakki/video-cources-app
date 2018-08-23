import { UserInteface, AuthenticateInterface } from './user.model';

export class User implements UserInteface {
    id: number;
    name: string;
    surname: string;
    login: string;
    password: string;
    fakeToken: string;

    constructor(id: number, login: string, password: string, name: string = '', surname: string = '') {
        this.id = id;
        this.login = login;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }
}

export class Authenticate implements AuthenticateInterface {
    login: string;
    password: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }
}
