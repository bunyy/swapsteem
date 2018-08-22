import { Injectable } from '@angular/core';
import {WebSocketSubject,WebSocketSubjectConfig} from 'rxjs/observable/dom/WebSocketSubject';
import * as busy from 'busyjs'
import { SteemconnectAuthService } from '../app/steemconnect/services/steemconnect-auth.service';

export interface OAuth2Token {
  access_token: string;
  expires_in: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {
  public busy = new busy.Client('wss://api.busy.org');;

  constructor(private auth :SteemconnectAuthService) {
    
    this.busy.call('get_notifications', ['aneilpatel'], function(err, result) {
      console.log(err, result);
    })
    
    this.busy.subscribe( function(err, result) {
      console.log(err, result);
    })
   }
   token:OAuth2Token = this.auth.token;

   getNotifs(){
     this.busy.call('login', [this.token.access_token], function(err, result) {
       console.log(err, result);
      })
      this.busy.call( 'subscribe', [this.token.username],function(err, result) {
        console.log(err, result);
      })
    
  }
  
}
