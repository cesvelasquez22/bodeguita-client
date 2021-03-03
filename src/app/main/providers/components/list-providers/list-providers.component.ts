import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import {Providemodel} from '../../models/providemodel';
import {ProviderservicesService} from '../../services/providerservices.service';

@Component({
  selector: 'app-list-providers',
  templateUrl: './list-providers.component.html',
  styleUrls: ['./list-providers.component.scss']
})
export class ListProvidersComponent implements OnInit {

  loading: boolean;

  displayedColumns: string[] = [
    '#',
    'ID Proveedor',
    'Nombre',
    'Direccion',
    'Telefono',
    'IdusuarioCreado',
    'FechaCreado',
    'IdusuarioActualizo',
    'FechaActualizado',
    'Estado',
    
];

datasource =  new MatTableDataSource<Providemodel>([]);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  private unsubscribe$: Subject<any> = new Subject();


  constructor(
    private providerservices: ProviderservicesService
  ) { }

  ngOnInit(): void {
    this.getProviders();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProviders(){
    this.loading = true;
    this.providerservices.getProviders().subscribe(
      (provide) => {
        if(provide && provide.length> 0 ){
          this.datasource = new MatTableDataSource<Providemodel>(
            provide
          );
          this.datasource.paginator = this.paginator;
        }
        this.loading = false;
      },
      (err) => (this.loading = false)
    );
  }

}
