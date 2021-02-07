import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

import { ProductService } from './services/product/product.service';


@NgModule({
  declarations: [ProductListComponent, ProductCreateComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
