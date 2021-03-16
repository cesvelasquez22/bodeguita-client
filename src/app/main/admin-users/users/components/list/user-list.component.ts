import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'app/core/models/user.model';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
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
        'UserName',
        'Correo',
        'Idrole',
        'actions',
    ];
    dataSource = new MatTableDataSource<IUser>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.loading = true;
        this.userService.getUsers().subscribe(
            (users) => {
                if (users && users.length > 0) {
                    this.dataSource = new MatTableDataSource<IUser>(
                        users
                    );
                    this.dataSource.paginator = this.paginator;
                }
                this.loading = false;
            },
            (err) => (this.loading = false)
        );
    }
}
