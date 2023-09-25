import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "@modules/dashboard/components/main/main.component";

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: '', redirectTo: 'tasks', pathMatch: 'full'},
      {path: 'tasks', loadChildren: () => import('@modules/tasks/tasks.module').then(mod => mod.TasksModule)},
      {path: 'employers', loadChildren: () => import('@modules/employers/employers.module').then(mod => mod.EmployersModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
