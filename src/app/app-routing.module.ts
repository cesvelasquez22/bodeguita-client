import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthRoutingModule} from './main/auth/auth-routing.module';
import { TasksComponent } from './main/auth/tasks/tasks.component';

//components




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
    //Authenticated Modules Only
    {
        path: 'tasks',
        component: TasksComponent
    }

    /* ******************************************************* */

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthRoutingModule
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
