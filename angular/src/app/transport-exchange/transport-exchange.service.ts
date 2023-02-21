import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderView} from '../models/order-view';
import {Order} from '../models/order';
import {Company} from '../models/company';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class TransportExchangeService {
    headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    readonly  url = 'https://localhost:7216/api'
    constructor(private http: HttpClient) { }

    getOrderView(): Observable<OrderView[]> {
        return this.http.get<any>(this.url + `/order/GetTransportExchangeView`);
    }

    getOrderDetail(id: string): Observable<Order> {
        return this.http.get<Order>(this.url + `/order/${id}`);
    }

    getUserCompany(userId: string): Observable<Company> {
        return this.http.get<Company>(this.url + `/company/GetUserCompany/${userId}`);
    }

    getCurrentUser(id: string): Observable<User> {
        return this.http.get<User>(this.url + `/User/GetCurrentUser/${id}`);
    }

    takeOrder(order: Order) {
        return this.http.put(`${this.url}/order/TakeOrder/${order.id}`, JSON.stringify(order), this.headers);
    }
}
