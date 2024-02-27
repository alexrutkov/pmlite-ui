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
import {urlData} from "@core/symbols";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {TaskShortDetailsComponent} from "@modules/tasks/components/task-short-details/task-short-details.component";
import {TASKS_URL} from "@modules/tasks/tokens";
import {ShortNumberPipe} from "@pipes/short-number.pipe";
import {SelectTagsComponent} from "@modules/tags/components/select-tags/select-tags.component";
import {TaskDetailsRouteComponent} from "@modules/tasks/components/task-details.route/task-details.route.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'all', pathMatch: 'full'},
      {
        path: 'all',
        component: TasksComponent,
        providers: [{provide: TASKS_URL, useValue: '/api/tasks/all'}]
      },
      {
        path: 'my',
        component: TasksComponent,
        providers: [{provide: TASKS_URL, useValue: '/api/tasks/my'}]
      },
    ]
  },
  {path: 'create', component: CreateTaskComponent, data: {[urlData]: '/api/tasks'}},
  {path: 'edit/:id', component: CreateTaskComponent, data: {[urlData]: '/api/tasks'}},
  {path: 'createRootTask', component: CreateTaskComponent, data: {[urlData]: '/api/tasks/createRootTask'}},
  {path: ':taskId', component: TaskDetailsRouteComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    CreateTaskComponent,
    TasksComponent,
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
        ScrollingModule,
        ShortNumberPipe,
        SelectTagsComponent
    ]
})
export class TasksModule {
}
