import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct } from 'app/main/inventory/product/models/product.model';
import { ProductService } from 'app/main/inventory/product/services/product/product.service';
import { Subject, combineLatest } from 'rxjs';
import { Inventory } from '../../models/inventory';
import { InventoryService } from "../../services/inventory.service";

@Component({
    selector: 'app-warehousing-list',
    templateUrl: './warehousing-list.component.html',
    styleUrls: ['./warehousing-list.component.scss'],
})
export class WarehousingListComponent implements OnInit {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;

    displayedColumns: string[] = [
        '#',
        'idproducto',
        'cantidad',
    ];

    dataSource = new MatTableDataSource<Inventory>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    private unsubscribe$: Subject<void> = new Subject();

    constructor(
        private inventoryService: InventoryService,
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.getInventoryList();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getInventoryList() {
        this.loading = true;
        this.inventoryService.getInventoryList()
            .subscribe(
                (productos) => {
                    console.log(productos);
                    if (productos && productos.length > 0) {
                        this.dataSource = new MatTableDataSource<Inventory>(productos);
                        this.dataSource.paginator = this.paginator;
                    }
                    this.loading = false;
                },
                (err) => {
                    (this.loading = false)
                }
            );
    }

}
