import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ISaleOrder } from "../models/sale-order";
import { environment } from "environments/environment";
import { IProduct } from "app/core/models/product.model";
import { IMeasureUnit } from "app/core/models/measureUnit.model";
import { ICustomer } from "app/core/models/customer.model";

@Injectable()
export class SaleOrderService {
    constructor(private http: HttpClient) {}

    getSalesOrders() {
        return this.http.get<ISaleOrder[]>(
            `${environment.API_URL + environment.ordenesVentaPrefix}/Lista`
        );
    }
}
