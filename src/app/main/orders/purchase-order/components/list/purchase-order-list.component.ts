import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IPurchaseOrder } from '../../models/purchase-order.model';
import { Subject } from 'rxjs';
import { PurchaseOrderService } from '../../services/purchase-order/purchase-order.service';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PurchaseOrderState } from 'app/core/enums/purchaseOrderState.enum';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;
    //
    // ─── RELATED TO TABLE ───────────────────────────────────────────────────────────
    //
    displayedColumns: string[] = [
        'posicion',
        'fechaCreacion',
        'fechaEspectativa',
        'idProveedor',
        'tipo',
        'actions',
    ];
    dataSource = new MatTableDataSource<IPurchaseOrder>([]);
    purchaseOrders: IPurchaseOrder[] = [];
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    filterBy = new FormControl('Compra');
    status = PurchaseOrderState;

    //
    // ─── UNSUBSCRIBE ALL ────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<any> = new Subject();

  constructor(
      private purchaseOrderService: PurchaseOrderService,
  ) { }

  ngOnInit(): void {
      this.getPurchaseOrders();
      this.onChangeStates();
  }

  getPurchaseOrders() {
    this.loading = true;
    this.purchaseOrderService.getPurchaseOrders().pipe(takeUntil(this.unsubscribe$)).subscribe(purchaseOrders => {
        if (purchaseOrders && purchaseOrders.length > 0) {
            this.purchaseOrders = purchaseOrders;
            this.dataSource = new MatTableDataSource<IPurchaseOrder>(
                this.purchaseOrders
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.filter = this.filterBy.value;
        }
        this.loading = false;
    }, (err) => (this.loading = false));
  }

  onChangeStates() {
      this.filterBy.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(changes => {
          if (changes && changes !== null) {
              this.dataSource.filter = changes;
          }
      })
  }

}
