import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserForAuthenticationDto} from '../models/authentication-user';
import {AuthResponseDto} from '../models/auth-response-dto';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    readonly  url = 'https://localhost:7216'
    constructor(private http: HttpClient) { }

    public loginUser = (route: string, body: UserForAuthenticationDto) => {
        return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.url), body);
    }

    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }

}
