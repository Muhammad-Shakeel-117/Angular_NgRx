import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AUTH_API_KEY } from "../../constants";
import { User } from "../../models/user.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(
        private http: HttpClient,
    ){}

    timer: any;

    login(email: string, password: string){
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${AUTH_API_KEY}`;
        const body = {
            email,
            password,
            returnSecureToken: true 
        }
        return this.http.post<User>(url, body);
    }

    signup(email: string, password: string){
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${AUTH_API_KEY}`;
        const body = {
            email,
            password,
            returnSecureToken: true 
        }
        return this.http.post<User>(url, body);
    }

    getErrorMessage(errorResponse: HttpErrorResponse){
        let message = 'An unknown error has occured.';

        if(!errorResponse.error || !errorResponse.error.error){
            console.log(errorResponse);
            return message;
        }
        switch(errorResponse.error.error.message){
            case 'INVALID_LOGIN_CREDENTIALS':
                message='The email or Password is incorrect';
                break;
            case 'EMAIL_NOT_FOUND':
                message = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                message = 'This password is not correct.';
                break;
            case 'USER_DISABLED':
                message = 'This user has been disabled.';
                break;
            case 'EMAIL_EXISTS':
                message = 'A User with the given email already exists.';
                break;
            default:
                message = errorResponse.error.error.message
        }

        return message;
    }
    
}