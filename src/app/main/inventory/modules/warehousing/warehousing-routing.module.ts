import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehousingCreateComponent } from './components/create/warehousing-create.component';
import { WarehousingComponent } from './warehousing.component';

const routes: Routes = [
    {
        path: '',
        component: WarehousingComponent,
    },
    {
        path: 'create',
        component: WarehousingCreateComponent,
    },
    {
        path: ':id',
        component: WarehousingCreateComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehousingRoutingModule { }
