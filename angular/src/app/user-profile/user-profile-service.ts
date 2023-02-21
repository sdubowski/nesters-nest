import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {Company} from '../models/company';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    readonly  url = 'https://localhost:7216/api'
    constructor(private http: HttpClient) { }

    getCurrentUser(): Observable<User> {
        const id = localStorage.getItem('userId');
        return this.http.get<User>(this.url + `/User/GetCurrentUser/${id}`);
    }

    getUserCompany(userId: string): Observable<Company> {
        return this.http.get<Company>(this.url + `/company/GetUserCompany/${userId}`);
    }
}
