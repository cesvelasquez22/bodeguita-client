import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomer } from 'app/core/models/customer.model';
import { IMeasureUnit } from 'app/core/models/measureUnit.model';
import { IProduct } from 'app/core/models/product.model';
import { IProvider } from 'app/core/models/provider.model';
import { IRole } from 'app/core/models/role.model';
import { IWarehousing } from 'app/core/models/warehousing.model';
import { IBrand } from 'app/main/inventory/product/models/brand.model';
import { ICategory } from 'app/main/inventory/product/models/category.model';
import { IDimension } from 'app/main/inventory/product/models/dimension.model';
import { ISaleOrder } from 'app/main/orders/sale-order/models/sale-order';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MainFacadeService {
    constructor(private http: HttpClient) {}

    getProducts() {
        return this.http.get<IProduct[]>(
            `${environment.API_URL + environment.productoPrefix}/ProductoList`
        );
    }

    getBrands() {
        return this.http.get<IBrand[]>(
            `${environment.API_URL + environment.marcaPrefix}/MarcaList`
        );
    }

    getCategories() {
        return this.http.get<ICategory[]>(
            `${environment.API_URL + environment.categoriaPrefix}/CategoriaList`
        );
    }

    getDimensions() {
        return this.http.get<IDimension[]>(
            `${environment.API_URL + environment.dimensionPrefix}/DimensionList`
        );
    }

    getProviders() {
        return this.http.get<IProvider[]>(
            `${environment.API_URL + environment.proveedorPrefix}/ProveedorList`
        );
    }

    getMeasureUnits() {
        return this.http.get<IMeasureUnit[]>(
            `${
                environment.API_URL + environment.unidadesMedidasPrefix
            }/UnidadesMedidasList`
        );
    }

    getCustomers() {
        return this.http.get<ICustomer[]>(
            `${environment.API_URL + environment.clientePrefix}/ClienteList`
        );
    }

    getInventoryList() {
        return this.http.get<IWarehousing[]>(
            `${environment.API_URL + environment.inventarioPrefix}/InventarioList`
        );
    }

    getSalesOrders() {
        return this.http.get<ISaleOrder[]>(
            `${environment.API_URL + environment.ordenesVentaPrefix}/Lista`
        );
    }

    getRoles() {
        return this.http.get<IRole[]>(`${ environment.API_URL + environment.rolesPrefix }/RoleList`);
    }
}
