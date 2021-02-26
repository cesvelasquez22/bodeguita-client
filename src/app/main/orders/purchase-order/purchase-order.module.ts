import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { PurchaseOrderCreateComponent } from './components/create/purchase-order-create.component';
import { PurchaseOrderListComponent } from './components/list/purchase-order-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'app/shared/shared.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseOrderService } from './services/purchase-order/purchase-order.service';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [PurchaseOrderCreateComponent, PurchaseOrderListComponent],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    DigitOnlyModule,

    // Material
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatToolbarModule,
  ],
  providers: [
      PurchaseOrderService
  ]
})
export class PurchaseOrderModule { }
