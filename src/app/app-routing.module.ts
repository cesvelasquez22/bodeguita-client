import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { FullLayoutContainer } from './layout/containers/full-layout/full-layout-container';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./main/home/home.module').then((m) => m.HomeModule),

    },
    {
        path: 'inventory',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./main/inventory/inventory.module').then((m) => m.InventoryModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
