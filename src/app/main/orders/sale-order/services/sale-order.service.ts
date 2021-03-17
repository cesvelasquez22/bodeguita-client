import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISaleOrder } from '../../../../core/models/sale-order';
import { environment } from 'environments/environment';
import { headers } from 'app/shared/constants/responseType';

@Injectable()
export class SaleOrderService {
    constructor(private http: HttpClient) {}

    getSalesOrders() {
        return this.http.get<ISaleOrder[]>(
            `${environment.API_URL + environment.ordenesVentaPrefix}/Lista`
        );
    }

    getSaleOrderDetail(idOrdenCompra: any) {
        return this.http.get<ISaleOrder>(
            `${ environment.API_URL + environment.ordenesVentaPrefix }/OrdenVenta/${ idOrdenCompra }`
        );
    }

    createSaleOrder(saleOrder: ISaleOrder) {
        return this.http.post(`${ environment.API_URL + environment.ordenesVentaPrefix }/AddOrdenVenta`, saleOrder, { headers: headers, responseType: 'text' });
    }

    updateSaleOrder(saleOrder: ISaleOrder) {
        return this.http.put(`${ environment.API_URL + environment.ordenesVentaPrefix }/UpdateOrdenVenta`, saleOrder, { headers: headers, responseType: 'text' });
    }

    annulSaleOrder(saleOrder: ISaleOrder) {
        return this.http.put(`${ environment.API_URL + environment.ordenesVentaPrefix }/AnularOrdenVenta`, saleOrder, { headers: headers, responseType: 'text' });
    }
}
