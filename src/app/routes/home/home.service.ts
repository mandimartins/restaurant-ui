import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClientService } from '../../shared/services/http-client/http-client.service';
import { Observable } from 'rxjs';
import { Menu } from './home.viewmodel';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClientService: HttpClientService) {}

  public getMenus(): Observable<Menu[]> {
    return this.httpClientService.get<Menu[]>(
      `${environment.RESTAURANT_API}/home/getmenus`,
    );
  }
}
