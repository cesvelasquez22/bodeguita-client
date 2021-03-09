import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IPurchaseOrder } from '../../models/purchase-order.model';

@Injectable()
export class PurchaseOrderService {
    constructor(private http: HttpClient) {}

    getPurchaseOrders() {
        return this.http.get<IPurchaseOrder[]>(
            `${environment.API_URL + environment.ordenesCompraPrefix}/Lista`
        );
    }
}
