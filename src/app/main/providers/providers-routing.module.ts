import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListProvidersComponent } from './components/list-providers/list-providers.component';
import {CreateProvidersComponent} from './components/create-providers/create-providers.component';

const routes: Routes = [

  {
    path: '',
    component: ListProvidersComponent,
  },
  {
    path: 'create',
    component: CreateProvidersComponent,
  }
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
