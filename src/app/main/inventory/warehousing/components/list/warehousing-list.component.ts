import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { Subject } from 'rxjs';
import { IWarehousing } from '../../../../../core/models/warehousing.model';
import { WarehousingService } from "../../services/warehousing.service";

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

    dataSource = new MatTableDataSource<IWarehousing>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    private unsubscribe$: Subject<void> = new Subject();

    constructor(
        private warehousingService: WarehousingService,
        private mainFacadeService: MainFacadeService,
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
        this.mainFacadeService.getInventoryList()
            .subscribe(
                (productos) => {
                    console.log(productos);
                    if (productos && productos.length > 0) {
                        this.dataSource = new MatTableDataSource<IWarehousing>(productos);
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
