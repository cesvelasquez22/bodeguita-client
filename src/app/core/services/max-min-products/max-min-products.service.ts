import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWarehousing } from 'app/core/models/warehousing.model';
import { environment } from 'environments/environment';
import * as _ from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMaxMinProduct } from '../../models/maxMinProduct.model';
import { MainFacadeService } from '../main-facade/main-facade.service';

@Injectable({
    providedIn: 'root',
})
export class MaxMinProductsService {
    constructor(
        private http: HttpClient,
        private mainFacadeService: MainFacadeService,
        ) {}

    getMaxMinProducts() {
        const maxMinProductsInfo$: Observable<[IMaxMinProduct[], IWarehousing[]]> = combineLatest(
            this.getMaxMin(),
            this.mainFacadeService.getInventoryList(),
        );

        return maxMinProductsInfo$.pipe(
            map(data => {
                if (data && data[0] && data[1]) {
                
                    const uniqArray = _.uniqBy(_.merge(data[0], data[1]), 'IDProducto');
                    uniqArray.forEach((product: any) => {
                        product.CantidadAproxA = product.cantidad - product.MinimoAceptable;
                    });
                    console.log(uniqArray);
                    const orderArray = _.orderBy(uniqArray, ['cantidad', 'CantidadAproxA'], ['asc', 'asc']);
                    return orderArray;
                }
            })
        );
    }

    private getMaxMin() {
        return this.http.get<IMaxMinProduct[]>(
            `${
                environment.API_URL + environment.maximosMinimosPrefix
            }/MaxMinList`
        );
    }
}
