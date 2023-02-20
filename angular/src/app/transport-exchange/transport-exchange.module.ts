import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {TransportExchangeService} from './transport-exchange.service';
import {TransportExchangeDetailComponent} from './transport-exchange-detail/transport-exchange-detail.component';
import {TransportExchangeRoutingModule} from './transport-exchange-routing.module';

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
        RouterModule.forChild(TransportExchangeRoutingModule),
        MatDatepickerModule,
    ],
    declarations: [
        TransportExchangeDetailComponent
    ],
    providers: [TransportExchangeService, DatePipe]
})

export class TransportExchangeModule {}
