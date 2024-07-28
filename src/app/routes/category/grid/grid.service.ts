import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/services/http-client/http-client.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GridViewModel } from './grid.viewmodel';
import { IBaseFilter, IGridService, ITable } from '../../../shared/models/basegrid';

@Injectable({
  providedIn: 'root'
})
export class GridService implements IGridService<GridViewModel> {

  constructor(private httpClientService: HttpClientService) { }

  public getAll(payLoad:IBaseFilter): Observable<ITable<GridViewModel>>{
    return this.httpClientService.post<ITable<GridViewModel>>(`${environment.RESTAURANT_API}/category/getall`,payLoad)
  }

  public delete(id:number):Observable<GridViewModel>{
    return this.httpClientService.delete(`${environment.RESTAURANT_API}/category/delete/${id}`)
  }
}
