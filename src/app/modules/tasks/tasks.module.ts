import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './components/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {CreateTaskComponent} from '@modules/tasks/components/create-task/create-task.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {QuillEditorComponent} from "ngx-quill";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {TasksComponent} from './components/tasks/tasks.component';
import {MatCardModule} from "@angular/material/card";
import {TaskComponent} from './components/task/task.component';
import {TaskDetailsComponent} from "@components/task-details/task-details.component";
import {urlData} from "@core/symbols";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {TaskShortDetailsComponent} from "@modules/tasks/components/task-short-details/task-short-details.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'all', pathMatch: 'full'},
      {path: 'all', component: TasksComponent, data: {[urlData]: '/api/tasks'}},
      {path: 'my', component: TasksComponent, data: {[urlData]: '/api/tasks'}},
    ]
  },
  {path: 'create', component: CreateTaskComponent, data: {[urlData]: '/api/tasks'}},
  {path: 'createRootTask', component: CreateTaskComponent, data: {[urlData]: '/api/tasks/createRootTask'}},
  {path: ':id', component: TaskDetailsComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    CreateTaskComponent,
    TasksComponent,
    TaskComponent,
    TaskShortDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    QuillEditorComponent,
    MatToolbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    ScrollingModule
  ]
})
export class TasksModule {
}
