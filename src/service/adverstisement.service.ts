import { Injectable, OnInit } from '@angular/core';
import { Observable } from '../../node_modules/rxjs';
import { AdvertisementResponse } from '../app/module/advertisement';
import { HttpClient } from '@angular/common/http';
import { filter } from '../../node_modules/rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable({
  providedIn: 'root'
})
export class AdverstisementService {
  private filterCurrency = new BehaviorSubject<any>(false);
  currenyFilter = this.filterCurrency.asObservable();
  private filterAdCoin = new BehaviorSubject<any>(false);
  adCoinFilter = this.filterAdCoin.asObservable();
  private filterPaymentMethod = new BehaviorSubject<any>(false);
  paymentMethodFilter = this.filterPaymentMethod.asObservable();
  private filterAdType = new BehaviorSubject<any>(false);
  adTypeFilter = this.filterAdType.asObservable();
  private _advertisement: Observable<AdvertisementResponse>;
  constructor(private _http: HttpClient) {

  }
  changefilter(ad_type, currency, ad_coin, payment_methods) {
    this.filterCurrency.next(currency);
    this.filterAdCoin.next(ad_coin);
    this.filterPaymentMethod.next(payment_methods);
    this.filterAdType.next(ad_type);
    console.log(this.currenyFilter, this.adCoinFilter, this.paymentMethodFilter, this.adTypeFilter)
  }
  getAdvertisementApi() {
    this._advertisement = this._http.get<AdvertisementResponse>('http://swapsteem-api.herokuapp.com/listings')
  }

  getAdvertisement(): Observable<AdvertisementResponse> {
    return this._advertisement;
  }


  filter(amount: string,
    paymentCurrency: string,
    location: string,
    paymentMethod: string) {

    if (amount != '') {
      this._advertisement.pipe(
        filter(data => data.ad_coin_amount == parseInt(amount))
      )
    }
    if (paymentCurrency != '') {
      this._advertisement.pipe(
        filter(data => data.ad_coin == paymentCurrency)
      )
    }
    if (location != '') {
      this._advertisement.pipe(
        filter(data => data.country == location)
      )
    }
    console.log()
  }
}
