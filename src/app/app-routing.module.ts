import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthRoutingModule} from './main/auth/auth-routing.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./main/home/home.module').then((m) => m.HomeModule),

    },
    {
        path: 'inventory',
        loadChildren: () =>
            import('./main/inventory/inventory.module').then((m) => m.InventoryModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthRoutingModule
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
