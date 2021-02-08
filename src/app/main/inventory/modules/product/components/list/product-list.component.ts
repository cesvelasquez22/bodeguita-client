import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProduct } from '../../models/product.model';
import { ProductListService } from '../../services/product-list/product-list.service';
import { ProductService } from '../../services/product/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
    //
    // ─── RELATED TO TABLE ───────────────────────────────────────────────────────────
    //
    displayedColumns: string[] = [
        '#',
        'Nombre',
        'IDMarca',
        'IDCategoria',
        'PrecioUnitario',
    ];
    dataSource = new MatTableDataSource<IProduct>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    //
    // ─── UNSUBSCRIBE ALL ────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<any> = new Subject();

    constructor(private productListService: ProductListService) {}

    ngOnInit(): void {
        this.getAllProducts();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getAllProducts() {
        this.productListService.productos$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((productos) => {
                if (productos && productos.length > 0) {
                    this.dataSource = new MatTableDataSource<IProduct>(
                        productos
                    );
                    this.dataSource.paginator = this.paginator;
                }
            });
    }
}
