import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MainComponent} from '@modules/users/components/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {UsersComponent} from '@modules/users/components/users/users.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {UserDetailsComponent} from "@components/user-details/user-details.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: ':id', component: UserDetailsComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatListModule,
    NgOptimizedImage,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UsersModule { }
