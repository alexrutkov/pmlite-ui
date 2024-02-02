import {AfterViewInit, Component, OnInit, TrackByFunction, ViewChild} from '@angular/core';
import {TasksStore} from "@stores/tasks.store";
import {EMPTY, filter, Observable, tap} from "rxjs";
import {Task} from "@modules/tasks/model/Task";
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

  tasks$: Observable<Task[]> = EMPTY;

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

  trackTaskFn: TrackByFunction<Task> = (index: number, task: Task) => {
    return task.id
  }

  ngAfterViewInit(): void {
    this.virtualScroll.elementScrolled()
      .pipe(
        filter(() => this.isScrollOnBottom())
      )
      .subscribe(() => this.tasksStore.tryLoadMore())
  }


  ngOnInit(): void {
/*    this.http.post('/api/tasks', {name: 'Простое имя', shortDescription: 'Короткое описание'})
      .subscribe()*/
  }

  private isScrollOnBottom(): boolean {
    const offset = this.virtualScroll.measureScrollOffset('bottom')
    return offset < AUTOLOAD_OFFSET;
  }
}
