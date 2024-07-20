import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {UpdateViewModel} from './update.viewmodel'
import { HttpClientService } from '../../../shared/services/http-client/http-client.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private httpClientService: HttpClientService) { }

  public Save(body:UpdateViewModel):Observable<unknown>{
    return this.httpClientService.post(`${environment.RESTAURANT_API}/category/add`,body)
  }
  
  public Get(id:number): Observable<unknown>{
    return this.httpClientService.get(`${environment.RESTAURANT_API}/category/get/${id}`)
  }
}
