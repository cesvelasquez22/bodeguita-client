import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  loading: boolean;

  displayedColumns: string[] = [
    '#',
    'Nombre',
    'Correo',
    'Usuario',
    'Fecha de Creacion',
    'Estado',
    'Contraseña',
    // 'Estado',
];

    datasource = new MatTableDataSource<User>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


    private unsubscribe$: Subject<any> = new Subject();

    constructor(private userservice: UserService) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUsers() {
    this.loading = true;
    this.userservice.getUsers().subscribe(
      (users) => {
        if(users && users.length > 0){
          this.datasource = new MatTableDataSource<User>
          (
            users);
            this.datasource.paginator = this.paginator;
        }
        this.loading = false;
      },
      (err) => (this.loading = false)
    );
  }


}
