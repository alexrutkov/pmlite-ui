import {AfterViewInit, Component, OnInit, TrackByFunction, ViewChild} from '@angular/core';
import {TasksStore} from "@modules/tasks/tasks.store";
import {EMPTY, filter, Observable, takeUntil, tap} from "rxjs";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {HttpClient} from "@angular/common/http";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {provideComponentStore} from "@ngrx/component-store";

const AUTOLOAD_OFFSET = 200

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
    private tasksStore: TasksStore,
    private http: HttpClient
  ) {
    this.tasks$ = this.tasksStore.select(s => s.tasks)
      .pipe(
        tap(() => this.virtualScroll?.ngOnInit())
      );
  }

  trackTaskFn: TrackByFunction<TaskSummary> = (index: number, task: TaskSummary) => {
    return task.id
  }

  ngAfterViewInit(): void {
    this.virtualScroll.elementScrolled()
      .pipe(
        filter(() => this.isScrollOnBottom()),
        takeUntil(this.tasksStore.isDone$)
      )
      .subscribe(() => this.tasksStore.tryLoadMore())
  }


  ngOnInit(): void {
  }

  private isScrollOnBottom(): boolean {
    const offset = this.virtualScroll.measureScrollOffset('bottom')
    return offset < AUTOLOAD_OFFSET;
  }
}
