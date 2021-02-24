import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleOrderRoutingModule } from './sale-order-routing.module';
import { SaleOrderCreateComponent } from './components/create/sale-order-create/sale-order-create.component';
import {SaleOrderListComponent} from './components/list/sale-order-list/sale-order-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


//Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [SaleOrderCreateComponent, SaleOrderListComponent],
  imports: [
    CommonModule,
    SaleOrderRoutingModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    //Material
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ]
})
export class SaleOrderModule { }
