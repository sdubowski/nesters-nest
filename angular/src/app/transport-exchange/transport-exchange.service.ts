import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderView} from '../models/order-view';
import {Order} from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class TransportExchangeService {
    readonly  url = 'https://localhost:7216/api'
    constructor(private http: HttpClient) { }

    getOrderView(typeId: number): Observable<OrderView[]> {
        return this.http.get<any>(this.url + `/order/GetOrderView?companyId=1&orderTypeId=${typeId}`);
    }

    getOrderDetail(id: string): Observable<Order> {
        return this.http.get<Order>(this.url + `/order/${id}`);
    }
}
