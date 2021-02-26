import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IWarehousing } from "../models/warehousing.model";

@Injectable()
export class WarehousingService {

  constructor(
    private http: HttpClient
  ) { }

  getInventoryList() {
    return this.http.get<IWarehousing[]>(`${environment.API_URL + environment.inventarioPrefix}/inventarioList`);
  }
}
