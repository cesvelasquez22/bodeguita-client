import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
    {
        path: '', // localhost/inventory/products/
        component: ProductListComponent,
    },
    {
        path: 'create', // localhost/inventory/products/create
        component: ProductCreateComponent,
    },
    {
        path: ':id', // localhost/inventory/products/:id
        component: ProductCreateComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
