import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {OrderListComponent} from '../../order-list/order-list.component';
import {MapsComponent} from '../../maps/maps.component';
import {TransportExchangeComponent} from '../../transport-exchange/transport-exchange.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user-profile',
        component: UserProfileComponent
    },
    {
        path: 'order-list',
        component: OrderListComponent,
        children: [{
            path: '',
            loadChildren: () => import('../../order-list/order-list.module').then(m => m.OrderListModule)
        }]
    },
    {
        path: 'transport-exchange',
        component: TransportExchangeComponent,
        children: [{
            path: '',
            loadChildren: () => import('../../transport-exchange/transport-exchange.module').then(m => m.TransportExchangeModule)
        }]
    }
];
