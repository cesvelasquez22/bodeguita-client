import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
    {
        path: '', // localhost/inventory/
        component: InventoryComponent,
    },
    {
        path: 'products', // localhost/inventory/products
        loadChildren: () =>
            import('./modules/product/product.module').then((m) => m.ProductModule),
    },
    {
        path: 'warehousing', // localhost/inventory/warehousing
        loadChildren: () =>
            import('./modules/warehousing/warehousing.module').then((m) => m.WarehousingModule),
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InventoryRoutingModule { }
