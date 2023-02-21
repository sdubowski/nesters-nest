import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderView} from '../models/order-view';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import {OrderStatus} from '../models/order-status';
import {Company} from '../models/company';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class OrderListService {
    headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    readonly  url = 'https://localhost:7216/api'
    constructor(private http: HttpClient) { }

    getOrderView(userId: string): Observable<OrderView[]> {
        return this.http.get<any>(this.url + `/order/GetOrderView?userId=${userId}`);
    }

    getOrderDetail(id: string): Observable<Order> {
        return this.http.get<Order>(this.url + `/order/${id}`);
    }

    createOrder(): Observable<Order> {
        return this.http.get<Order>(this.url + `/order/CreateOrder`);
    }

    getOrderStatus(): Observable<OrderStatus[]> {
        return this.http.get<OrderStatus[]>(this.url + `/order/GetAllOrderStatus`);
    }

    addOrder(order: Order) {
        return this.http.post(`${this.url}/order`, JSON.stringify(order), this.headers);
    }

    updateOrder(order: Order) {
        return this.http.put(`${this.url}/order/${order.id}`, JSON.stringify(order), this.headers);
    }

    getCompany(id: number): Promise<Company> {
        return this.http.get<Company>(this.url + `/company/${id}`).toPromise();
    }

    getUserCompany(userId: string): Observable<Company> {
        return this.http.get<Company>(this.url + `/company/GetUserCompany/${userId}`);
    }

    getDriversByCompany(companyId: number): Observable<User[]> {
        return this.http.get<User[]>(this.url + `/user/GetDriversByCompany/${companyId}`);
    }

}
