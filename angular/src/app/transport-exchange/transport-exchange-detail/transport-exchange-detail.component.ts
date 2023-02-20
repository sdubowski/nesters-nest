import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {NotifierService} from 'angular-notifier';
import {OrderListService} from '../../order-list/order-list.service';
import {TransportExchangeService} from '../transport-exchange.service';

@Component({
    selector: 'app-transport-exchange-detail',
    templateUrl: './transport-exchange-detail.component.html',
    styleUrls: ['./transport-exchange-detail.component.css']
})
export class TransportExchangeDetailComponent implements OnInit {
    public orderDetail: Order;
    public id: string;
    public isLoaded: boolean;
    public isEdit: boolean;
    private readonly notifier: NotifierService;

    constructor(private transportExchangeService: TransportExchangeService,
                private route: ActivatedRoute,
                private datePipe: DatePipe,
                private router: Router,
                notifierService: NotifierService) {
        this.notifier = notifierService;
    }

    async ngOnInit() {
        this.isEdit = this.route.snapshot.data.title === 'Edit';

        if (this.isEdit) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.transportExchangeService.getOrderDetail(this.id).subscribe(result => {
                this.orderDetail = result;
                this.isLoaded = true;
            })
        }
    }

    goBack(approve: boolean) {
        if (approve) {
            // this.notifier.notify('success', 'Changes saved successfully!', 'not_1');
            this.notifier.notify('error', 'An error occurred while saving changes', 'not_2');
        }
        this.router.navigate(['/order-list']);
    }

}
