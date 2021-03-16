import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleCreateComponent } from './components/create/role-create.component';
import { RoleListComponent } from './components/list/role-list.component';


@NgModule({
  declarations: [RoleCreateComponent, RoleListComponent],
  imports: [
    CommonModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
