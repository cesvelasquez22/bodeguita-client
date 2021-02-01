import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    // Material


    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
