import { Component, OnInit } from '@angular/core';
import {OrderView} from '../models/order-view';
import {OrderListService} from './order-list.service';
import {NotifierService} from 'angular-notifier';
import {Company} from '../models/company';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public orderView: OrderView[] = [];
  public userId: string = localStorage.getItem('userId');
  public roleId: string = localStorage.getItem('roleId');

  constructor(private orderListService: OrderListService) {
  }

  async ngOnInit() {

      this.orderListService.getOrderView(this.userId).subscribe(result => {
        this.orderView = result;
      });
  }

}
