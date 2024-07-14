import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {UpdateViewModel} from './update.viewmodel'
import { HttpClientService } from '../../../shared/services/http-client/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private httpClientService: HttpClientService) { }

  public Save(body:UpdateViewModel):Observable<unknown>{
    return this.httpClientService.post('https://localhost:7051/api/category/add',body)
  }
  
  public Get(id:number): Observable<unknown>{
    return this.httpClientService.get(`https://localhost:7051/api/category/get/${id}`)
  }
}
