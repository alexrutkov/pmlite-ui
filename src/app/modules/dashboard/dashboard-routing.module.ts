import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "@modules/dashboard/components/main/main.component";

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: '', redirectTo: 'tasks', pathMatch: 'full'},
      {path: 'tasks', loadChildren: () => import('@modules/tasks/tasks.module').then(mod => mod.TasksModule)},
      {path: 'employers', loadChildren: () => import('@modules/employers/employers.module').then(mod => mod.EmployersModule)},
      {path: 'teams', loadChildren: () => import('@modules/teams/teams.module').then(mod => mod.TeamsModule)},
      {path: 'account', loadChildren: () => import('@modules/account/account.module').then(mod => mod.AccountModule)},
      {path: 'agreements', loadChildren: () => import('@modules/agreements/agreements.module').then(mod => mod.AgreementsModule)},
      {path: 'history', loadChildren: () => import('@modules/history/history.module').then(mod => mod.HistoryModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
