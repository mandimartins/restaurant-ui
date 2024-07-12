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

    const userInfo = JSON.parse(data) as IUserInfo

    return userInfo.token;
  }

  public storeUserInfo(userInfo: IUserInfo){
    localStorage.setItem("userInfo",JSON.stringify(userInfo))
  }
}
