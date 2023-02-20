
import {Routes} from '@angular/router';
import {OrderDetailComponent} from './order-detail/order-detail.component';



export const OrderListRoutes: Routes = [
    {
        path: 'edit/:id',
        component: OrderDetailComponent,
        data: {
            title: 'Edit'
        }
    },
    {
        path: 'add',
        component: OrderDetailComponent,
        data: {
            title: 'Add'
        }
    }
];
