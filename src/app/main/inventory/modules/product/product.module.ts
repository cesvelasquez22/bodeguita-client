import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './components/list/product-list.component';
import { ProductCreateComponent } from './components/create/product-create.component';

import { ProductService } from './services/product/product.service';

import { SharedModule } from 'app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductComponent } from './product.component';
import { ProductListService } from './services/product-list/product-list.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [ProductListComponent, ProductCreateComponent, ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    FlexLayoutModule,

    // Material
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    ProductService,
    ProductListService,
  ]
})
export class ProductModule { }
