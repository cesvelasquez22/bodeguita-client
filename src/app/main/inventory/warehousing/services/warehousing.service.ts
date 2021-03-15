import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWarehousing } from 'app/core/models/warehousing.model';
import { headers } from 'app/shared/constants/responseType';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class WarehousingService {
    private newProductInventory = new BehaviorSubject<IWarehousing>(null);
    public newProductInventory$ = this.newProductInventory.asObservable();

    constructor(private http: HttpClient) {}

    getProductInventory(productInventoryId: any) {
        return this.http.get<IWarehousing>(`${environment.API_URL + environment.inventarioPrefix}/inventario/${productInventoryId}`);
    }

    createProductInventory(productInventory: IWarehousing) {
        return this.http.post(
            `${
                environment.API_URL + environment.inventarioPrefix
            }/AddInventario`,
            productInventory,
            { headers: headers, responseType: 'text' }
        );
    }

    updateProductInventory(productInventory: IWarehousing) {
        return this.http.put(
            `${
                environment.API_URL + environment.inventarioPrefix
            }/UpdateInventario/${productInventory.IdInventario}`,
            productInventory,
            { headers: headers, responseType: 'text' }
        );
    }

    addProductInventory(productInventory: IWarehousing) {
        this.newProductInventory.next(productInventory);
    }
}
