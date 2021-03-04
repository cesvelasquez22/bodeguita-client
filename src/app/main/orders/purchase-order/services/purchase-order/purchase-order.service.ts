import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { IPurchaseOrder } from "../../models/purchase-order.model";
import { IProvider } from "../../../../../core/models/provider.model";
import { IProduct } from "app/core/models/product.model";
import { IMeasureUnit } from "app/core/models/measureUnit.model";

@Injectable()
export class PurchaseOrderService {
    constructor(private http: HttpClient) {}

    getPurchaseOrders() {
        return this.http.get<IPurchaseOrder[]>(
            `${environment.API_URL + environment.ordenesCompraPrefix}/Lista`
        );
    }

    getProviders() {
        return this.http.get<IProvider[]>(
            `${environment.API_URL + environment.proveedorPrefix}/ProveedorList`
        );
    }

    getProducts() {
        return this.http.get<IProduct[]>(
            `${environment.API_URL + environment.productoPrefix}/ProductoList`
        );
    }

    getMeasureUnits() {
        return this.http.get<IMeasureUnit[]>(
            `${
                environment.API_URL + environment.unidadesMedidasPrefix
            }/UnidadesMedidasList`
        );
    }
}
