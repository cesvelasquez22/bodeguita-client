import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'app/core/models/customer.model';
import { IMaxMinProduct } from 'app/core/models/maxMinProduct.model';
import { IProduct } from 'app/core/models/product.model';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { MaxMinProductsService } from 'app/core/services/max-min-products/max-min-products.service';
import { IzitoastAlertService } from 'app/core/utils/izitoast-alert.service';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { ISaleOrder } from '../orders/sale-order/models/sale-order';
import { IWidgetData } from './models/widget.data';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    loading: boolean;
    dateNow = Date.now();

    widgetInfo$: Observable<
        [IProduct[], ISaleOrder[], ICustomer[], IMaxMinProduct[]]
    >;

    constructor(
        private mainFacadeService: MainFacadeService,
        private maxMinProductService: MaxMinProductsService,
        private izitoastAlertService: IzitoastAlertService,
    ) {
        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);
    }

    widgetData: IWidgetData[] = [
        {
            title: 'Productos únicos',
            statsNumber: 0,
            numberFg: 'orange-fg',
        },
        {
            title: 'Ventas emitidas',
            statsNumber: 0,
            numberFg: 'blue-grey-fg',
        },
        {
            title: 'Clientes',
            statsNumber: 0,
            numberFg: 'light-blue-fg',
        },
        {
            title: 'Productos agotados',
            statsNumber: 0,
            numberFg: 'red-fg',
        },
    ];

    ngOnInit(): void {
        this.getWidgetsLength();
    }

    getWidgetsLength() {
        this.loading = true;
        this.widgetInfo$ = combineLatest(
            this.mainFacadeService.getProducts(),
            this.mainFacadeService.getSalesOrders(),
            this.mainFacadeService.getCustomers(),
            this.maxMinProductService.getMaxMinProducts().pipe(
                map(maxMinProduct => maxMinProduct.filter((product: any) => product.cantidad <= 0)),
            )
        );

        this.widgetInfo$.subscribe(data => {
            if (data[3] && data[3].length > 0) {
                data[3].forEach((product, index) => {
                    setTimeout(() => {
                      this.izitoastAlertService.MaxMinAlerts(product.IDProducto);
                    }, index * 5000);
                  });
            }
        })
        this.loading = false;
    }
}
