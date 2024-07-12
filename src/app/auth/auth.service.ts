import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClientService } from '../shared/services/http-client/http-client.service';
import { TokenService } from './token.service';
import { IUserInfo } from './IUserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClientService: HttpClientService,
    private tokenService: TokenService) { }

  public auth(user: any): Observable<unknown> {
    return this.httpClientService
      .post('https://localhost:7051/api/auth/signin', user)
      .pipe(
        map(response => {
          this.tokenService.storeUserInfo((response as IUserInfo))
          return response;
        }));
  }
}
