import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { IPurchaseOrder } from '../../models/purchase-order.model';
import { Subject } from 'rxjs';

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
        '#',
        'FechaEspectativa',
        'IDProveedor',
        'Tipo',
        'IDEstadoOrdenCompra',
    ];
    dataSource = new MatTableDataSource<IPurchaseOrder>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    //
    // ─── UNSUBSCRIBE ALL ────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<any> = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

}
