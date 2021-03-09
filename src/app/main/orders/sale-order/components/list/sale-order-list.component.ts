import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ISaleOrder } from '../../models/sale-order';
import { Subject } from 'rxjs';

import { SaleOrderService } from '../../services/sale-order.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-sale-order-list',
    templateUrl: './sale-order-list.component.html',
    styleUrls: ['./sale-order-list.component.scss'],
})
export class SaleOrderListComponent implements OnInit {
    loading: boolean;

    displayedColumns: string[] = [
        'posicion',
        'idOrdenVenta',
        'fechaCreacion',
        'fechaSalida',
        'idCliente',
        'tipo',
        'estado',
    ];

    dataSource = new MatTableDataSource<ISaleOrder>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    private unsubscribe$: Subject<any> = new Subject();

    constructor(private saleOrderService: SaleOrderService) {}
    ngOnInit(): void {
        this.getSalesOrders();
    }

    getSalesOrders() {
        this.loading = true;
        this.saleOrderService
            .getSalesOrders()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (saleOrders) => {
                    if (saleOrders && saleOrders.length > 0) {
                        this.dataSource = new MatTableDataSource<ISaleOrder>(
                            saleOrders
                        );
                        this.dataSource.paginator = this.paginator;
                    }
                    this.loading = false;
                },
                (err) => (this.loading = false)
            );
    }
}
