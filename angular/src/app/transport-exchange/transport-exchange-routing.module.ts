
import {Routes} from '@angular/router';
import {TransportExchangeDetailComponent} from './transport-exchange-detail/transport-exchange-detail.component';



export const TransportExchangeRoutingModule: Routes = [
    {
        path: 'preview/:id',
        component: TransportExchangeDetailComponent,
        data: {
            title: 'Edit'
        }
    },
    {
        path: 'add',
        component: TransportExchangeDetailComponent,
        data: {
            title: 'Add'
        }
    }
];
