import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', loadComponent: () => import('@components/login/login.component').then(mod => mod.LoginComponent)},
  {path: 'registration', loadComponent: () => import('@components/registration/registration.component').then(mod => mod.RegistrationComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
