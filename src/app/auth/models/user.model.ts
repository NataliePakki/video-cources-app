export interface UserInteface {
    id: number;
    name: string;
    surname: string;
    login: string;
    password: string;
    fakeToken: string;
}

export interface AuthenticateInterface {
    login: string;
    password: string;
}
