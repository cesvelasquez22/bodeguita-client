import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRole } from 'app/core/models/role.model';
import { IUser } from 'app/core/models/user.model';
import { MainFacadeService } from 'app/core/services/main-facade/main-facade.service';
import { IzitoastAlertService } from 'app/core/utils/izitoast-alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
    //
    // ─── PARAMS ─────────────────────────────────────────────────────────────────────
    //
    loading: boolean;
    userId: string;
    currentDate = new Date();

    //
    // ─── RELATED TO FORM ────────────────────────────────────────────────────────────
    //
    userForm: FormGroup;
    roles: IRole[] = [];

    //
    // ─── UNSUBSCIBE ALL ─────────────────────────────────────────────────────────────
    //
    private unsubscribe$: Subject<void> = new Subject();

    constructor(
        private formBuilder: FormBuilder,
        private mainFacadeService: MainFacadeService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private izitoastAlertService: IzitoastAlertService
    ) {
        this.buildForm();
        this.userId = this.route.snapshot.paramMap.get('id');
    }

    private buildForm() {
        this.userForm = this.formBuilder.group({
            Idusuario: [0, []],
            Nombre: [null, [Validators.required]],
            Correo: [null, [Validators.required, Validators.email]],
            UserName: [null, [Validators.required]],
            Idrole: [null, [Validators.required]],
            FechaCreacion: [
                new Date(
                    this.currentDate.getFullYear(),
                    this.currentDate.getMonth(),
                    this.currentDate.getDate()
                ),
                [],
            ],
            Estado: [true, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.getRoles();
        this.getUserInfo();
    }

    getRoles() {
        this.loading = true;
        this.mainFacadeService
            .getRoles()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (roles) => {
                    if (roles && roles.length > 0) {
                        this.roles = roles;
                    }
                    this.loading = false;
                },
                (err) => (this.loading = true)
            );
    }

    onSubmit(form) {
        this.loading = true;
        const user: IUser = this.userForm.value;
        if (this.userId) {
            //
            // ─── UPDATE ──────────────────────────────────────────────────────
            //
            this.userService.updateUser(user).subscribe(
                (response) => {
                    this.izitoastAlertService.CustomSuccessAlert(response);
                    this.loading = false;
                    this.router.navigate(['/admin/admin-users/users']);
                },
                (err) => {
                    this.izitoastAlertService.CustomErrorAlert(
                        'Hubo un error intentando actualizar el usuario'
                    );
                    this.loading = false;
                }
            );
        } else {
            //
            // ─── CREATE ──────────────────────────────────────────────────────
            //
            this.userService.createUser(user).subscribe(
                (response) => {
                    this.izitoastAlertService.CustomSuccessAlert(response);
                    this.loading = false;
                    this.router.navigate(['/admin/admin-users/users']);
                },
                (err) => {
                    this.izitoastAlertService.CustomErrorAlert(
                        'Hubo un error intentando crear el usuario'
                    );
                    this.loading = false;
                }
            );
        }
    }

    clear() {
        this.userForm.get('Nombre').setValue(null);
        this.userForm.get('Correo').setValue(null);
        this.userForm.get('UserName').setValue(null);
        this.userForm.get('Idrole').setValue(null);
    }

    getUserInfo() {
        this.clear();
        this.loading = true;
        if (this.userId) {
            //
            // ─── EDIT ────────────────────────────────────────────────────────
            //
            this.userService.getUser(this.userId).subscribe(user => {
                if (user && user !== null) {
                    this.setToUserForm(user);
                }
                this.loading = false;
            }, (err) => (this.loading = false));
        }
    }

    setToUserForm(user: IUser) {
        this.userForm.controls.Idusuario.setValue(user.Idusuario);
        this.userForm.controls.Nombre.setValue(user.Nombre);
        this.userForm.controls.Correo.setValue(user.Correo);
        this.userForm.controls.UserName.setValue(user.UserName);
        this.userForm.controls.Idrole.setValue(user.Idrole);
    }
}
