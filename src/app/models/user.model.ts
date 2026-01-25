export interface User{
    idToken: string;
    email: string;
    refreshToken: string;
    experiesIn: string;
    localId: string;
    registered?: boolean;
}