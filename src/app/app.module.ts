import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SteemconnectModule } from './steemconnect/steemconnect.module';
import { AppRoutingModule } from './app-routing.module';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home/home.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostTradeComponent } from './post-trade/post-trade.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WalletComponent } from './wallet/wallet.component';
import { ProfileComponent } from './profile/profile.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RedirectComponent } from './redirect/redirect.component';
import { environment } from '../environments/environment';
import { SearchBoxComponent } from './search-box/search-box.component';
import { BuyPageComponent } from './buy-page/buy-page.component';
import { SellPageComponent } from './sell-page/sell-page.component';
import {FormsModule} from '@angular/forms';
import { PurchaseComponent } from './purchase/purchase.component';
import { BuySteemComponent } from './buy-steem/buy-steem.component';
import { BuySbdComponent } from './buy-sbd/buy-sbd.component';
import { SellSbdComponent } from './sell-sbd/sell-sbd.component';
import { SellSteemComponent } from './sell-steem/sell-steem.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { AuthInterceptor } from './../service/auth.intercepter';
import {MomentModule} from 'angular2-moment';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';
import { TradePipePipe } from '../pipes/trade-pipe.pipe';

const config: SocketIoConfig = { url: 'http://swapsteem-api.herokuapp.com', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AppNavComponent,
    HomeComponent,
    BuyComponent,
    SellComponent,
    DashboardComponent,
    PostTradeComponent,
    NotificationsComponent,
    WalletComponent,
    ProfileComponent,
    PagenotfoundComponent,
    RedirectComponent,
    SearchBoxComponent,
    BuyPageComponent,
    SellPageComponent,
    PurchaseComponent,
    BuySteemComponent,
    BuySbdComponent,
    SellSbdComponent,
    SellSteemComponent,
    ChatPageComponent,
    TradePipePipe
  ],
  imports: [
    NgxAutoScrollModule,
    MomentModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    SteemconnectModule.forRoot(environment.steemconnectConfig),
    CookieModule.forRoot(),
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
