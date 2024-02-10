import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {concatMap, EMPTY, Observable} from "rxjs";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {map} from "rxjs/operators";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TaskMenuComponent} from "@modules/tasks/components/task-menu/task-menu.component";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, MatChipsModule, NgOptimizedImage, RouterLink, MatIconButton, MatIcon, TaskMenuComponent],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit{
  task$: Observable<TaskSummary> = EMPTY;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.task$ = this.route.params.pipe(
      map(p => p['id'] as string),
      concatMap(id => this.http.get<TaskSummary>(`/api/tasks/${id}`))
    );
  }
}
