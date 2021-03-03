import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateComponent} from './components/create/create.component';
import { ListComponent } from './components/list/list.component';


const routes: Routes = [

  {
    path: '', // localhost/inventory/products/
    component: ListComponent,
},
{
    path: 'create', // localhost/inventory/products/create
    component: CreateComponent,
},
{
    path: ':id', // localhost/inventory/products/:id
    component: CreateComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
