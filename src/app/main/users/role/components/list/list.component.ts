import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import {IDrole} from '../../models/idrole';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  loading: boolean;

  displayedColumns: string[] = [
    '#',
    'ID Role',
    'Nombre',
    'Descripcion',
    
];

datasource = new MatTableDataSource<IDrole>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


    private unsubscribe$: Subject<any> = new Subject();


  constructor(private roleservice: RoleService) { }

  ngOnInit(): void {
    this. getRoles();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getRoles(){
    this.loading = true;
    this.roleservice.getRoles().subscribe(
      (roles) => {
        if(roles && roles.length> 0 ){
          this.datasource = new MatTableDataSource<IDrole>(
            roles
          );
          this.datasource.paginator = this.paginator;
        }
        this.loading = false;
      },
      (err) => (this.loading = false)
    );
  }

}
