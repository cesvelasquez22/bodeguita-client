import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

import { RouterModule, Routes } from '@angular/router';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

// Fuse
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './components/widget/widget.component';
import { BestSalesComponent } from './components/best-sales/best-sales.component';
import { MatPaginatorModule } from '@angular/material/paginator';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
  declarations: [HomeComponent, WidgetComponent, BestSalesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
    // Material
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,

    // Fuse
    FuseSharedModule,
    FuseSidebarModule,
    FuseWidgetModule
  ]
})
export class HomeModule { }
