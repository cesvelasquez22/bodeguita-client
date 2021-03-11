import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { headers } from 'app/shared/constants/responseType';
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

    createPurchaseOrder(purchaseOrder: IPurchaseOrder) {
        return this.http.post(`${ environment.API_URL + environment.ordenesCompraPrefix }/AddOrdenCompra`, purchaseOrder, { headers: headers, responseType: 'text' });
    }

    updatePurchaseOrder(purchaseOrder: IPurchaseOrder) {
        return this.http.post(`${ environment.API_URL + environment.ordenesCompraPrefix }/UpdateOrdenCompra`, purchaseOrder, { headers: headers, responseType: 'text' });
    }
}
