import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";
import {RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TaskMenuComponent} from "@modules/tasks/components/task-menu/task-menu.component";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelContent,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {UserTasksComponent} from "@modules/users/components/user-tasks/user-tasks.component";
import {TaskUsersComponent} from "@modules/tasks/components/task-users/task-users.component";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, MatChipsModule, NgOptimizedImage, RouterLink, MatIconButton, MatIcon, TaskMenuComponent, MatAccordion, MatExpansionPanel, MatExpansionPanelContent, MatExpansionPanelHeader, MatExpansionPanelTitle, UserTasksComponent, TaskUsersComponent],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {
  task$: Observable<TaskSummary> = EMPTY;

  @Input() set taskId(id: number) {
    this.task$ = this.http.get<TaskSummary>(`/api/tasks/${id}`);
  }
  constructor(
    private http: HttpClient
  ) {
  }

}
