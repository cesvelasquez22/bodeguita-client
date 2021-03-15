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

    getPurchaseOrderDetail(idOrdenCompra: any) {
        return this.http.get<IPurchaseOrder>(
            `${ environment.API_URL + environment.ordenesCompraPrefix }/OrdenCompra/${ idOrdenCompra }`
        );
    }

    createPurchaseOrder(purchaseOrder: IPurchaseOrder) {
        return this.http.post(`${ environment.API_URL + environment.ordenesCompraPrefix }/AddOrdenCompra`, purchaseOrder, { headers: headers, responseType: 'text' });
    }

    updatePurchaseOrder(purchaseOrder: IPurchaseOrder) {
        return this.http.put(`${ environment.API_URL + environment.ordenesCompraPrefix }/UpdateOrdenCompra`, purchaseOrder, { headers: headers, responseType: 'text' });
    }

    annulPurchaseOrder(purchaseOrder: IPurchaseOrder) {
        return this.http.put(`${ environment.API_URL + environment.ordenesCompraPrefix }/AnularOrdenCompra`, purchaseOrder, { headers: headers, responseType: 'text' });
    }
}
