import { Injectable } from '@angular/core';
import { IUserInfo } from './IUserInfo';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { 

  }

  public getToken():string{

    const data = localStorage.getItem("userInfo")
    
    if(!data)
      return "";

    const {Token} = JSON.parse(data) as IUserInfo

    return Token;
  }

  public storeUserInfo(userInfo: IUserInfo){
    localStorage.setItem("userInfo",JSON.stringify(userInfo))
  }
}
