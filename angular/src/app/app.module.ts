import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {OrderDetailComponent} from './order-list/order-detail/order-detail.component';
import {AuthenticationService} from './authentication/authentication.service';
import {NotifierModule} from 'angular-notifier';
import {AuthInterceptor} from './service/http-interceptor.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NotifierModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [AuthenticationService,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
],
  bootstrap: [AppComponent, OrderDetailComponent]
})
export class AppModule { }
