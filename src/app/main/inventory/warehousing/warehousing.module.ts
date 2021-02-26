import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WarehousingRoutingModule } from "./warehousing-routing.module";
import { WarehousingListComponent } from "./components/list/warehousing-list.component";
import { WarehousingCreateComponent } from "./components/create/warehousing-create.component";

import { SharedModule } from "app/shared/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";

// Material
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { WarehousingService } from "./services/warehousing.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [WarehousingListComponent, WarehousingCreateComponent],
    imports: [
        CommonModule,
        WarehousingRoutingModule,
        SharedModule,
        FlexLayoutModule,
        HttpClientModule,

        // Material
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
    ],
    providers: [WarehousingService],
})
export class WarehousingModule {}
