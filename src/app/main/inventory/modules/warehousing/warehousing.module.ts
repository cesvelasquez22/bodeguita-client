import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousingRoutingModule } from './warehousing-routing.module';
import { WarehousingListComponent } from './components/list/warehousing-list.component';
import { WarehousingCreateComponent } from './components/create/warehousing-create.component';
import { WarehousingComponent } from './warehousing.component';

import { SharedModule } from 'app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [WarehousingListComponent, WarehousingCreateComponent, WarehousingComponent],
  imports: [
    CommonModule,
    WarehousingRoutingModule,
    SharedModule,
    FlexLayoutModule,

    // Material
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class WarehousingModule { }