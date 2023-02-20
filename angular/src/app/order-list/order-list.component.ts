import { Component, OnInit } from '@angular/core';
import {OrderView} from '../models/order-view';
import {OrderListService} from './order-list.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public orderView: OrderView[] = [];
  constructor(private orderListService: OrderListService) {
  }

  async ngOnInit() {
    this.orderListService.getOrderView(1).subscribe(result => {
      this.orderView = result;
    });
  }

}
