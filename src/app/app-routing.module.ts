import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';

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
    {
        path: 'orders',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./main/orders/order.module').then((m) => m.OrderModule),
    },

    {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./main/users/users.module').then((m) => m.UsersModule),
    },

    {
        path: 'providers',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./main/providers/providers.module').then((m) => m.ProvidersModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
