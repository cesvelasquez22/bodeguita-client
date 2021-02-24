import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderListComponent } from '../purchase-order/components/list/purchase-order-list.component';
import {SaleOrderCreateComponent} from './components/create/sale-order-create/sale-order-create.component';
import {SaleOrderListComponent} from './components/list/sale-order-list/sale-order-list.component';

const routes: Routes = [
 {
   path: '',
   component: PurchaseOrderListComponent,
 },
 {
  path: 'create',
  component: SaleOrderCreateComponent,
 },
 {
   path: 'id',
   component: SaleOrderListComponent,
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleOrderRoutingModule { }
