import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderView} from '../models/order-view';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import {OrderStatus} from '../models/order-status';

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

    getOrderView(typeId: number): Observable<OrderView[]> {
        return this.http.get<any>(this.url + `/order/GetOrderView?companyId=1&orderTypeId=${typeId}`);
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

}
