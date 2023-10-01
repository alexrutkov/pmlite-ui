import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MainComponent} from './components/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {EmployersComponent} from './components/employers/employers.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: '', component: MainComponent
  }
];

@NgModule({
  declarations: [
    MainComponent,
    EmployersComponent
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
export class EmployersModule { }
