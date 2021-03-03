import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from './users.component';

const routes: Routes = [

  {
    path: '',
    component: UsersComponent,
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./user/user.module').then((m)=> m.UserModule)
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('./role/role.module').then((m)=> m.RoleModule)
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
