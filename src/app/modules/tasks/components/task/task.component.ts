import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Task} from '@modules/tasks/model/Task';
import {TasksStore} from "@stores/tasks.store";
import {concatMap, map} from "rxjs/operators";
import {EMPTY, Observable} from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements  OnInit{

  task$: Observable<Task> = EMPTY;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksStore: TasksStore
  ) {
  }

  ngOnInit(): void {
    this.task$ = this.activatedRoute.params.pipe(
      map(p => p['id'] as string),
      concatMap(id => this.tasksStore.selectTask(id))
    );
  }
}
