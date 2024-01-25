import {inject, NgModule} from '@angular/core';
import {CanMatchFn, Route, RouterModule, Routes, UrlSegment} from '@angular/router';
import {PermissionsService} from "@services/permissions.service";

const canMatchDashboard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return inject(PermissionsService).canMatch(segments);
};

const routes: Routes = [
  {path: 'login', loadComponent: () => import('@components/login/login.component').then(mod => mod.LoginComponent)},
  {
    path: 'registration',
    loadChildren: () => import('@modules/registration/registration.module').then(m => m.RegistrationModule),
    title: 'Регистрация'
  },
  {
    path: '',
    loadChildren: () => import('@modules/dashboard/dashboard.module').then(mod => mod.DashboardModule),
    canMatch: [canMatchDashboard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
