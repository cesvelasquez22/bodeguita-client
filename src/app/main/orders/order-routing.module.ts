import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';

const routes: Routes = [
    {
        path: '',
        component: OrderComponent,
    },
    {
        path: 'purchase-orders',
        loadChildren: () =>
            import('./purchase-order/purchase-order.module').then((m) => m.PurchaseOrderModule),
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
