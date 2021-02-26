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
    {
        path: 'sales-orders',
        loadChildren: () =>
            import('./sale-order/sale-order.module').then((m)=>m.SaleOrderModule),
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
