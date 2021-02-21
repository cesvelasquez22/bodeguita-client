import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderCreateComponent } from './components/create/purchase-order-create.component';
import { PurchaseOrderListComponent } from './components/list/purchase-order-list.component';

const routes: Routes = [
    {
        path: '',
        component: PurchaseOrderListComponent,
    },
    {
        path: 'create',
        component: PurchaseOrderCreateComponent,
    },
    {
        path: ':id',
        component: PurchaseOrderCreateComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
