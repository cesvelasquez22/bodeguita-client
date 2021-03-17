import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IRole } from 'app/core/models/role.model';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { IzitoastAlertService } from 'app/core/utils/izitoast-alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateRoleService } from '../../services/create-role.service';
import { RoleService } from '../../services/role.service';
import { RoleCreateComponent } from '../create/role-create.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit, OnDestroy {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;

    //
    // ─── RELATED TO TABLE ───────────────────────────────────────────────────────────
    //
    displayedColumns: string[] = [
        'Posicion',
        'Nombre',
        'Descripcion',
        'actions',
    ];
    dataSource = new MatTableDataSource<IRole>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    //
    // ─── UNSUBSCRIBE ALL ────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<void> = new Subject();

  constructor(
      private mainFacadeService: MainFacadeService,
      private createRoleDialog: MatDialog,
      private createRoleService: CreateRoleService,
      private roleService: RoleService,
      private izitoastAlertService: IzitoastAlertService,
  ) { }

  ngOnInit(): void {
      this.getRoles();
      this.listenRoleChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getRoles() {
    this.loading = true;
    this.mainFacadeService.getRoles().subscribe(
        (roles) => {
            if (roles && roles.length > 0) {
                this.dataSource = new MatTableDataSource<IRole>(
                    roles
                );
                this.dataSource.paginator = this.paginator;
            }
            this.loading = false;
        },
        (err) => (this.loading = false)
    );
}

roleDialog(element?, editar?: boolean) {
    this.createRoleDialog.open(RoleCreateComponent, {
        data: {
            editRole: editar ? element : null,
        },
        width: 'auto',
        disableClose: false,
        autoFocus: false,
    });
}

listenRoleChanges() {
    this.createRoleService.newRole$.pipe(takeUntil(this.unsubscribe$)).subscribe(role => {
        console.log(role);
        if (role && role !== null) {
            if (role.edit) {
              this.updateRole(role);
            } else {
              this.addRole(role);
            }
          }
    });
}

addRole(role: IRole) {
    this.loading = true;
    this.roleService
        .createRole(role)
        .subscribe(
            (response) => {
                this.izitoastAlertService.CustomSuccessAlert(response);
                this.loading = false;
                this.getRoles();
            },
            (err) => {
                this.izitoastAlertService.CustomErrorAlert('Hubo un error intentando agregar el rol de usuario');
                this.loading = false;
            }
        );
}

updateRole(role: IRole) {
    this.loading = true;
    this.roleService
        .updateRole(role)
        .subscribe(
            (response) => {
                this.izitoastAlertService.CustomSuccessAlert(response);
                this.loading = false;
                this.getRoles();
            },
            (err) => {
                this.izitoastAlertService.CustomErrorAlert('Hubo un error intentando actualizar el rol de usuario');
                this.loading = false;
            }
        );
}

}
