import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRole } from 'app/core/models/role.model';
import { CreateRoleService } from '../../services/create-role.service';

@Component({
    selector: 'app-role-create',
    templateUrl: './role-create.component.html',
    styleUrls: ['./role-create.component.scss'],
})
export class RoleCreateComponent implements OnInit {
    title: string;

    //
    // ─── RELATED TO FORM ──────────────────────────────────────────
    //
    roleForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private createRoleService: CreateRoleService,
        public dialogRef: MatDialogRef<RoleCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.roleForm = this.formBuilder.group({
            IdRole: [0, []],
            Nombre: [null, []],
            Descripcion: [null, []],
            edit: [this.data && this.data.editRole ? true : false],
        });
    }

    ngOnInit() {
        this.title = 'Nuevo';

        if (this.data && this.roleForm.controls.edit.value === true) {
            this.setToForm(this.data.editRole);
            this.title = 'Editar';
        }
    }

    onSubmit(form) {
        if (this.data && this.data.editRole) {
            this.onCancel();
        }
        this.createRoleService.addRole(this.roleForm.value);
        this.dialogRef.close(`${this.roleForm.value}`);
        this.createRoleService.addRole(null);
        this.clear();
    }

    setToForm(rol: IRole) {
        this.roleForm.controls.IdRole.setValue(rol.IdRole);
        this.roleForm.controls.Nombre.setValue(rol.Nombre);
        this.roleForm.controls.Descripcion.setValue(rol.Descripcion);
    }

    clear() {
        this.roleForm.reset();
        this.roleForm.controls.Nombre.setValue(null);
        this.roleForm.controls.Descripcion.setValue(null);
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
