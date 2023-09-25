import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './components/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {CreateTaskComponent} from './components/create.task/create.task.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'create', component: CreateTaskComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule
  ]
})
export class TasksModule { }
