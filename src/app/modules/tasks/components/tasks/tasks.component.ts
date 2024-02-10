import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TasksStore} from "@modules/tasks/tasks.store";
import {EMPTY, Observable, tap} from "rxjs";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {provideComponentStore} from "@ngrx/component-store";
import {AutoloadService} from "@services/autoload.service";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [
    provideComponentStore(TasksStore)
  ]
})
export class TasksComponent implements OnInit, AfterViewInit {

  tasks$: Observable<TaskSummary[]> = EMPTY;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  constructor(
    public tasksStore: TasksStore,
    private autoloadService: AutoloadService
  ) {
    this.tasks$ = this.tasksStore.select(s => s)
      .pipe(tap(() => this.virtualScroll?.ngOnInit()));
  }

  ngAfterViewInit(): void {
    this.autoloadService.initAutoloadStore(
      this.virtualScroll,
      this.tasksStore
    );
  }


  ngOnInit(): void {
  }

}
