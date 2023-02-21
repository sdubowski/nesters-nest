import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {NotifierService} from 'angular-notifier';
import {OrderListService} from '../../order-list/order-list.service';
import {TransportExchangeService} from '../transport-exchange.service';
import {Company} from '../../models/company';
import {User} from '../../models/user';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

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
    public userId: string = localStorage.getItem('userId');
    public roleId: string = localStorage.getItem('roleId');
    public isForwarder: boolean;
    public company: Company;
    public driver: User;
    public showTakeButton: boolean;

    constructor(private transportExchangeService: TransportExchangeService,
                private route: ActivatedRoute,
                private datePipe: DatePipe,
                private router: Router,
                notifierService: NotifierService) {
        this.notifier = notifierService;
    }

    async ngOnInit() {
        this.driver = <User>{firstName: '', lastName: ''};
        this.isEdit = this.route.snapshot.data.title === 'Edit';
        this.transportExchangeService.getUserCompany(this.userId).subscribe(res => {
            this.company = res;
        });


        if (this.isEdit) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.transportExchangeService.getOrderDetail(this.id).subscribe(result => {
                this.orderDetail = result;
                if (isNotNullOrUndefined(this.orderDetail.driverId)) {
                    this.transportExchangeService.getCurrentUser(this.orderDetail.driverId).subscribe(res => {
                        this.driver = res;
                    });
                }
                this.showTakeButton = this.orderDetail.orderStatusId === 7;
                this.isLoaded = true;
            })
        }
    }

    goBack() {
        this.router.navigate(['/transport-exchange']);
    }

    calculateProfit() {
        if (isNotNullOrUndefined(this.orderDetail.mileage) && isNotNullOrUndefined(this.orderDetail.mileageRate)) {
            this.orderDetail.profit = this.orderDetail.mileage * this.orderDetail.mileageRate;
        }
    }

    getTitle() {
        if (this.isEdit) { return 'Edit - ' + this.orderDetail.id; }
    }

    takeOrder() {
        this.orderDetail.driverId = this.userId;
        this.transportExchangeService.takeOrder(this.orderDetail).subscribe(result => {
            this.notifier.notify('success', 'Order has been taken successfully!', 'not_1');
            this.router.navigate(['/transport-exchange']);
        }, res => {
            Object.values(res.error.errors).forEach(err => {
                this.notifier.notify('error', err[0], 'not_1');
            })
        })
    }

}
