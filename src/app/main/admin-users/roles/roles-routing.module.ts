import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './components/list/role-list.component';
import { RoleCreateComponent } from './components/create/role-create.component';

const routes: Routes = [
    {
        path: '',
        component: RoleListComponent
    },
    {
        path: 'create',
        component: RoleCreateComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
