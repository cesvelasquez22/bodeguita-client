import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleHeaderComponent } from './components/title-header/title-header.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    TitleHeaderComponent,
    LoadingOverlayComponent
  ],
  exports: [
    TitleHeaderComponent,
    LoadingOverlayComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
