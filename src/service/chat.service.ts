import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,} from '@angular/common/http';
import {SteemconnectAuthService} from '../app/steemconnect/services/steemconnect-auth.service'
import { AdvertisementResponse } from '../app/module/advertisement';
import { MessageResponse } from '../app/module/message';

export interface OAuth2Token {
  access_token: string;
  expires_in: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 

  constructor(private _http: HttpClient,private auth :SteemconnectAuthService) {
    
   }
  
    token:OAuth2Token = this.auth.token;

  getMessages(){
    console.log("Hit service");
    return this._http.get<MessageResponse[]>("http://swapsteem-api.herokuapp.com/messages");
  }
}
