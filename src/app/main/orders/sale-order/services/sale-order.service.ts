import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ISaleOrder} from '../models/sale-order';
import { environment } from 'environments/environment';

@Injectable()
export class SaleOrderService {

  constructor(
    private http: HttpClient,
  ) { }

  getSalesOrders(){
    return this.http.get<ISaleOrder[]>(`${environment.API_URL + environment.ordenesVentaPrefix}/Lista`);

  }

}
