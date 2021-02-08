import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { PrivateTasksComponent } from './private-tasks/private-tasks.component';
import { SigninComponent } from './signin/signin.component';
// import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
//   {
//     path: 'tasks',
//     component: TasksComponent,
//     pathMatch: 'full'

//   },
//   {
//     path:'private-tasks',
//     component: PrivateTasksComponent
//   },
  {
    path: 'signin',
    component: SigninComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
