import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IMaxMinProduct } from '../../../../core/models/maxMinProduct.model';
import { MaxMinProductsService } from '../../../../core/services/max-min-products/max-min-products.service';
import * as _ from 'lodash';
import { IWarehousing } from 'app/core/models/warehousing.model';
import { statusesColor } from 'app/shared/constants/statusesColor';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';

@Component({
    selector: 'app-max-min-products',
    templateUrl: './max-min-products.component.html',
    styleUrls: ['./max-min-products.component.scss'],
})
export class MaxMinProductsComponent implements OnInit {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    statusesColor = statusesColor;
    //
    // ─── RELATED TO TABLE ───────────────────────────────────────────────────────────
    //
    displayedColumns: string[] = [
        '#',
        'IDProducto',
        'MinimoAceptable',
        'MaximoAceptable',
        'cantidad',
    ];
    dataSource = new MatTableDataSource<IMaxMinProduct>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    //
    // ─── UNSUBSCRIBE ALL ────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<void> = new Subject();

    constructor(
        private maxMinProductService: MaxMinProductsService,
        private mainFacadeService: MainFacadeService,
        ) {}

    ngOnInit(): void {
        this.getMaxMinProducts();
    }

    getMaxMinProducts() {
        this.maxMinProductService.getMaxMinProducts().pipe(takeUntil(this.unsubscribe$)).subscribe(maxMinProducts => {
            this.dataSource = new MatTableDataSource<IMaxMinProduct>(
                maxMinProducts
            );
            this.dataSource.paginator = this.paginator;
        });
    }
}
