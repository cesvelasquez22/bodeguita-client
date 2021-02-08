import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreateComponent } from './components/create/product-create.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
    {
        path: '', // localhost/inventory/products/
        component: ProductComponent,
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
