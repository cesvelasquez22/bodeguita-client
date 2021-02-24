import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IDSaleOrder} from '../Models/sale-order';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleOrderService {

  constructor(
    private http: HttpClient,
  ) { }

  getSalesOrders(){
    return this.http.get<IDSaleOrder[]>(`${environment.API_URL + environment.ordenesVentaPrefix}/Lista`);

  }

}
