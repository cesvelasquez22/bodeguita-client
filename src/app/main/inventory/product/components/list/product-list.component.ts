import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { Subject } from 'rxjs';
import { IProduct } from '../../../../../core/models/product.model';
import { ProductService } from '../../services/product/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;

    //
    // ─── RELATED TO TABLE ───────────────────────────────────────────────────────────
    //
    displayedColumns: string[] = [
        '#',
        'IDMarca',
        'IDDimension',
        'IDCategoria',
        'PrecioCompra',
        'PrecioVenta',
        'actions',
    ];
    dataSource = new MatTableDataSource<IProduct>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    //
    // ─── UNSUBSCRIBE ALL ────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<any> = new Subject();

    constructor(
        private mainFacadeService: MainFacadeService,
        ) {}

    ngOnInit(): void {
        this.getProducts();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getProducts() {
        this.loading = true;
        this.mainFacadeService.getProducts().subscribe(
            (productos) => {
                if (productos && productos.length > 0) {
                    this.dataSource = new MatTableDataSource<IProduct>(
                        productos
                    );
                    this.dataSource.paginator = this.paginator;
                }
                this.loading = false;
            },
            (err) => (this.loading = false)
        );
    }
}
