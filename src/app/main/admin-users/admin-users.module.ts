import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUsersComponent } from './admin-users.component';
import { SharedModule } from '../../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [AdminUsersComponent],
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    SharedModule,
    FlexLayoutModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AdminUsersModule { }
