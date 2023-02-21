import { Component, OnInit } from '@angular/core';
import {TransportExchangeService} from './transport-exchange.service';
import {OrderView} from '../models/order-view';


@Component({
    selector: 'app-transport-exchange',
    templateUrl: './transport-exchange.component.html',
    styleUrls: ['./transport-exchange.component.css']
})
export class TransportExchangeComponent implements OnInit {

    public orderView: OrderView[] = [];
    constructor(private transportExchangeService: TransportExchangeService) {
    }

    async ngOnInit() {
        this.transportExchangeService.getOrderView().subscribe(result => {
            this.orderView = result;
        });
    }

}
