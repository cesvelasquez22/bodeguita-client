import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/list/user-list.component';
import { UserCreateComponent } from './components/create/user-create.component';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'create',
        component: UserCreateComponent
    },
    {
        path: ':id',
        component: UserCreateComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
