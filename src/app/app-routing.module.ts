import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { FullLayoutContainer } from './layout/containers/full-layout/full-layout-container';
import { SimpleLayoutContainer } from './layout/containers/simple-layout/simple-layout.container';

const routes: Routes = [
    {
        path: '',
        component: SimpleLayoutContainer,
        children: [
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
        ]
    },
    {
        path: 'admin',
        component: FullLayoutContainer,
        canActivate: [AuthGuard],
        children: [
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
            {
                path: 'orders',
                loadChildren: () =>
                    import('./main/orders/order.module').then((m) => m.OrderModule),
            },
        ]
    },
    {
        path: '**',
        redirectTo: '',
    }, 
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
