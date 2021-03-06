import { Component, OnInit } from '@angular/core';
import { SteemconnectAuthService } from '../steemconnect/services/steemconnect-auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APIService } from '../../service/api.service';
import { Router } from '@angular/router';
import { AdvertisementResponse } from '../module/advertisement';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = [];
  noOfAds = 0;
  balance_steem;
  balance_sbd;
  balance_sp;
  profile_url;
  profile;
  selectedAdId: string = '';
  constructor(private _auth: SteemconnectAuthService,
    private apiSer: APIService,
    private router: Router) { }
  openAds: Observable<AdvertisementResponse[]>;

  ngOnInit() {
    this._auth.getUserData().subscribe(data => {
      this.userData = data;
      console.log(this.userData);
      this.openAds = this.apiSer.getAdsByUser(this.userData.name);
      console.log(this.openAds);
      this.balance_sbd = this.userData.account.sbd_balance.split(" ")[0];
      this.balance_steem = this.userData.account.balance.split(" ")[0];
      this.balance_sp = this.userData.account.vesting_shares.split(" ")[0];
      this.profile = JSON.parse(this.userData.account.json_metadata);
      this.profile_url = this.profile && this.profile.profile ? this.profile.profile.profile_image : '';
      console.log(this.profile_url)
    });
    //this.openAds.subscribe(data => console.log(data))
  }

  viewAds(ad: AdvertisementResponse) {
    this.router.navigate(['post-trade/' + ad._id]);
  }

  pauseAd(id: string, currentStatus:string) {
    this.apiSer.pauseAd(id, currentStatus).subscribe(res => {
      this.openAds = this.apiSer.getAdsByUser(this.userData.name);
    });
  }

  deleteAd(id: string) {
    this.apiSer.deleteAd(id).subscribe(res => {
      this.openAds = this.apiSer.getAdsByUser(this.userData.name);
    });
  }
}