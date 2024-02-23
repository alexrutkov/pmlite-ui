import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TasksStore} from "@modules/tasks/stores/tasks.store";
import {EMPTY, Observable, tap} from "rxjs";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {provideComponentStore} from "@ngrx/component-store";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [
    provideComponentStore(TasksStore)
  ]
})
export class TasksComponent implements AfterViewInit {

  tasks$: Observable<TaskSummary[]> = EMPTY;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  constructor(
    public tasksStore: TasksStore
  ) {
    this.tasks$ = this.tasksStore.select(s => s)
      .pipe(tap(() => this.virtualScroll?.ngOnInit()));
  }

  ngAfterViewInit(): void {
    this.tasksStore.initAutoloadStore(this.virtualScroll);
  }


  ngOnInit(): void {
  }

}
