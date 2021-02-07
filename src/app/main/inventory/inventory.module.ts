import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { SharedModule } from 'app/shared/shared.module';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [InventoryComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule,
    FlexLayoutModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class InventoryModule { }
