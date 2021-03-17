import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehousingRoutingModule } from './warehousing-routing.module';
import { WarehousingListComponent } from './components/list/warehousing-list.component';
import { WarehousingCreateComponent } from './components/create/warehousing-create.component';

import { SharedModule } from 'app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WarehousingService } from './services/warehousing.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
    declarations: [WarehousingListComponent, WarehousingCreateComponent],
    imports: [
        CommonModule,
        WarehousingRoutingModule,
        SharedModule,
        FlexLayoutModule,
        HttpClientModule,
        ReactiveFormsModule,
        DigitOnlyModule,

        // Material
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
})
export class WarehousingModule {}
