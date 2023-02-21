import { Component, OnInit } from '@angular/core';
import {Order} from '../../models/order';
import {OrderListService} from '../order-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {NotifierService} from 'angular-notifier';
import {OrderStatus} from '../../models/order-status';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {Company} from '../../models/company';
import {User} from '../../models/user';

declare interface OrderStatusDict {
    id: number;
    title: string;
}
const ORDER_STATUS: OrderStatusDict[] = [
    { id: 1, title: 'Dashboard' },
    { id: 2, title: 'User Profile'},
    { id: 3, title: 'Orders List'},
    { id: 4, title: 'Transport exchange'},
];

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})

export class OrderDetailComponent implements OnInit {
    public orderDetail: Order;
    public id: string;
    public isLoaded: boolean;
    public isEdit: boolean;
    public isAdd: boolean;
    private readonly notifier: NotifierService;
    public orderStatuses: OrderStatus[] = [];
    public allStatuses: OrderStatus[] = [];
    public userId: string = localStorage.getItem('userId');
    public roleId: string = localStorage.getItem('roleId');
    public isForwarder: boolean;
    public company: Company;
    public driverList: User[] = [];

    constructor(private orderListService: OrderListService,
                private route: ActivatedRoute,
                private datePipe: DatePipe,
                private router: Router,
                notifierService: NotifierService) {
        this.notifier = notifierService;
    }

    async ngOnInit() {
        this.orderListService.getOrderStatus().subscribe(result => {
            this.allStatuses = result;
        })
        this.isEdit = this.route.snapshot.data.title === 'Edit';
        this.isAdd = this.route.snapshot.data.title === 'Add';
        this.isForwarder = this.roleId === 'Forwarder';

        this.orderListService.getUserCompany(this.userId).subscribe(res => {
            this.company = res;
            this.orderListService.getDriversByCompany(this.company.id).subscribe(result => {
                this.driverList = result;
            })
        });

        if (this.isEdit) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.orderListService.getOrderDetail(this.id).subscribe(result => {
                this.orderDetail = result;
                this.orderStatuses = this.allStatuses;
                if (!this.isForwarder) {
                    this.orderStatuses = this.allStatuses.filter(x => x.id === 8 || x.id === 4);
                }
                this.isLoaded = true;
            })
        } else if (this.isAdd) {
            this.orderListService.createOrder().subscribe(result => {
                this.orderDetail = result;
                this.isLoaded = true;
            })
        }
    }

    save() {
        if (this.isAdd) {
            this.orderListService.addOrder(this.orderDetail).subscribe(result => {
                this.notifier.notify('success', 'Changes saved successfully!', 'not_1');
                this.router.navigate(['/order-list']);
            }, res => {
                Object.values(res.error.errors).forEach(err => {
                    this.notifier.notify('error', err[0], 'not_1');
                })
            })
        } else {
            this.orderListService.updateOrder(this.orderDetail).subscribe(result => {
                this.notifier.notify('success', 'Changes saved successfully!', 'not_1');
                this.router.navigate(['/order-list']);
            }, res => {
                Object.values(res.error.errors).forEach(err => {
                    this.notifier.notify('error', err[0], 'not_1');
                })
            })
        }
    }

    goBack() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate(['/order-list']);
    }

    setOrderStatus() {
        if (this.isForwarder) {
            return;
        }
        if (this.orderDetail.orderStatusId === 3) {
            this.orderStatuses = this.allStatuses.filter(x => x.id === 3 || x.id === 5);
        }
        if (this.orderDetail.orderStatusId === 5) {
            this.orderStatuses = this.allStatuses.filter(x => x.id === 5);
        }
        if (this.orderDetail.orderStatusId === 8) {
            this.orderStatuses = this.allStatuses.filter(x => x.id === 8 || x.id === 3 || x.id === 5);
        }
        if (this.orderDetail.orderStatusId === 9) {
            this.orderStatuses = this.allStatuses.filter(x => x.id === 9);
        }
    }

    calculateProfit() {
        if (isNotNullOrUndefined(this.orderDetail.mileage) && isNotNullOrUndefined(this.orderDetail.mileageRate)) {
            this.orderDetail.profit = this.orderDetail.mileage * this.orderDetail.mileageRate;
        }
    }

    getTitle() {
       if (this.isEdit) { return 'Edit - ' + this.orderDetail.id; }
       if (this.isAdd) { return 'Add'; }
    }

    getStatus() {
        return this.allStatuses.filter(x => x.id === this.orderDetail.orderStatusId);
    }
}
