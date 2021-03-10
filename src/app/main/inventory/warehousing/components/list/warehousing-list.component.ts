import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { IzitoastAlertService } from 'app/core/utils/izitoast-alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IWarehousing } from '../../../../../core/models/warehousing.model';
import { WarehousingService } from '../../services/warehousing.service';
import { WarehousingCreateComponent } from '../create/warehousing-create.component';

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

    displayedColumns: string[] = ['#', 'idproducto', 'cantidad', 'actions'];

    dataSource = new MatTableDataSource<IWarehousing>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    private unsubscribe$: Subject<void> = new Subject();

    constructor(
        private warehousingService: WarehousingService,
        private mainFacadeService: MainFacadeService,
        private createProductInventoryialog: MatDialog,
        private izitoastAlertService: IzitoastAlertService,
    ) {}

    ngOnInit(): void {
        this.getInventoryList();
        this.listenProductInventoryChanges();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getInventoryList() {
        this.loading = true;
        this.mainFacadeService.getInventoryList().subscribe(
            (productos) => {
                if (productos && productos.length > 0) {
                    this.dataSource = new MatTableDataSource<IWarehousing>(
                        productos
                    );
                    this.dataSource.paginator = this.paginator;
                }
                this.loading = false;
            },
            (err) => (this.loading = false)
        );
    }

    productInventoryDialog(element?, editar?: boolean) {
        this.createProductInventoryialog.open(WarehousingCreateComponent, {
            data: {
                editProductInventory: editar ? element : null,
            },
            width: 'auto',
            disableClose: false,
            autoFocus: false,
        });
    }

    listenProductInventoryChanges() {
        this.warehousingService.newProductInventory$.pipe(takeUntil(this.unsubscribe$)).subscribe(productInventory => {
            if (productInventory && productInventory !== null) {
                if (productInventory.edit) {
                  this.updateProductInventory(productInventory);
                } else {
                  this.addProductInventory(productInventory);
                }
              }
        })
    }

    addProductInventory(productInventory: IWarehousing) {
        this.loading = true;
        this.warehousingService
            .createProductInventory(productInventory)
            .subscribe(
                (response) => {
                    this.izitoastAlertService.CustomWarningAlert(response);
                    this.loading = false;
                },
                (err) => {
                    this.izitoastAlertService.CustomErrorAlert('Hubo un error intentando agregar el producto en inventario');
                    this.loading = false;
                }
            );
    }

    updateProductInventory(productInventory: IWarehousing) {
        this.loading = true;
        this.warehousingService
            .updateProductInventory(productInventory)
            .subscribe(
                (response) => {
                    this.izitoastAlertService.CustomSuccessAlert(response);
                    this.loading = false;
                },
                (err) => {
                    this.izitoastAlertService.CustomErrorAlert('Hubo un error intentando actualizar el producto en inventario');
                    this.loading = false;
                }
            );
    }
}
