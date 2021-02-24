import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IPurchaseOrder } from '../../models/purchase-order.model';
import { Subject } from 'rxjs';
import { PurchaseOrderService } from '../../services/purchase-order/purchase-order.service';
import { takeUntil } from 'rxjs/operators';

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
        'idOrdenCompra',
        'fechaCreacion',
        'fechaEspectativa',
        'idProveedor',
        'tipo',
        'estado',
    ];
    dataSource = new MatTableDataSource<IPurchaseOrder>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    //
    // ─── UNSUBSCRIBE ALL ────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<any> = new Subject();

  constructor(
      private purchaseOrderService: PurchaseOrderService,
  ) { }

  ngOnInit(): void {
      this.getPurchaseOrders();
  }

  getPurchaseOrders() {
    this.purchaseOrderService.getPurchaseOrders().pipe(takeUntil(this.unsubscribe$)).subscribe(purchaseOrders => {
        if (purchaseOrders && purchaseOrders.length > 0) {
            this.dataSource = new MatTableDataSource<IPurchaseOrder>(
                purchaseOrders
            );
            this.dataSource.paginator = this.paginator;
        }
    });
  }

}
