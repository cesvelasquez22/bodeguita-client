import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IPurchaseOrder } from '../../models/purchase-order.model';
import { IProvider } from '../../../../../core/models/provider.model';

@Injectable()
export class PurchaseOrderService {

  constructor(
      private http: HttpClient,
  ) { }

  getPurchaseOrders() {
    return this.http.get<IPurchaseOrder[]>(`${environment.API_URL + environment.ordenesCompraPrefix}/Lista`);
  }

  getProviders() {
      return this.http.get<IProvider[]>(`${environment.API_URL + environment.proveedorPrefix}/ProveedorList`);
  }
}
