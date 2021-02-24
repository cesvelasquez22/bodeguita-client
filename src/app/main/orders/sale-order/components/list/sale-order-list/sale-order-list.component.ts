import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {IDSaleOrder} from '../../../Models/sale-order';
import { Subject } from 'rxjs';

import {SaleOrderService} from '../../../services/sale-order.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-sale-order-list',
  templateUrl: './sale-order-list.component.html',
  styleUrls: ['./sale-order-list.component.scss']
})
export class SaleOrderListComponent implements OnInit {

  

  loading: boolean;

  displayedColumns: string[] = [
    'idOrdenVenta',
    'fechacreacion',
    'fechadesalida',
    'idcliente',
    'estado',


  ];

  dataSource = new MatTableDataSource<IDSaleOrder>([]);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  private unsubscribe$: Subject<any> = new Subject();

  constructor( 
    private saleOrderService: SaleOrderService,) { }
  ngOnInit(): void {

  }

  getSalesOrders() {
    this.saleOrderService.getSalesOrders().pipe(takeUntil(this.unsubscribe$)).subscribe(saleOrders =>{
      if(saleOrders && saleOrders.length > 0) {
        this.dataSource = new MatTableDataSource<IDSaleOrder>(
          saleOrders
          );
          console.log('dataSource :>> ', this.dataSource);
          this.dataSource.paginator = this.paginator;
      }
    });
  }

}
