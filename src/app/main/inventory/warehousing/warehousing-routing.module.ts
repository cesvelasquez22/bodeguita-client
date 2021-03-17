import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehousingCreateComponent } from './components/create/warehousing-create.component';
import { WarehousingListComponent } from './components/list/warehousing-list.component';

const routes: Routes = [
    {
        path: '',
        component: WarehousingListComponent,
    },
    {
        path: 'create',
        component: WarehousingCreateComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehousingRoutingModule { }
