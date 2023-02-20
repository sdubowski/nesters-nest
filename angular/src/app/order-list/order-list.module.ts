import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CommonModule, DatePipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {OrderListService} from './order-list.service';
import {OrderListRoutes} from './order-list-routing.module';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        RouterModule.forChild(OrderListRoutes),
        MatDatepickerModule,
        NgSelectModule,
    ],
    declarations: [
        OrderDetailComponent
    ],
    providers: [OrderListService, DatePipe]
})

export class OrderListModule {}
