import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SaleOrderCreateComponent} from './components/create/sale-order-create.component';
import {SaleOrderListComponent} from './components/list/sale-order-list.component';

const routes: Routes = [
 {
   path: '',
   component: SaleOrderListComponent,
 },
 {
  path: 'create',
  component: SaleOrderCreateComponent,
 },
 {
   path: ':id',
   component: SaleOrderListComponent,
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleOrderRoutingModule { }
