import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { CreateComponent } from './components/create/create/create.component';
import { ListComponent } from './components/list/list/list.component';


@NgModule({
  declarations: [CreateComponent, ListComponent],
  imports: [
    CommonModule,
    RoleRoutingModule
  ]
})
export class RoleModule { }
