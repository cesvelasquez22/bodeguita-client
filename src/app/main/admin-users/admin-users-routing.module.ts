import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users.component';

const routes: Routes = [
    {
        path: '',
        component: AdminUsersComponent,
    },
    {
        path: 'users',
        loadChildren: () =>
            import('./users/users.module').then((m) => m.UsersModule),
    },
    {
        path: 'roles',
        loadChildren: () =>
            import('./roles/roles.module').then((m)=>m.RolesModule),
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule { }
