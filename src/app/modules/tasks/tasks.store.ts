import {Inject, Injectable} from "@angular/core";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {initialTasksState, TasksState} from "@modules/tasks/model/TasksState";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TASKS_URL} from "@modules/tasks/tokens";
import {Subject} from "rxjs";


@Injectable()
export class TasksStore extends ComponentStore<TasksState> implements OnStoreInit {

  private isLoading = false;
  private page = 0;
  private pageSize = 25;
  private sizeParam = new HttpParams().set('size', this.pageSize);
  private isDone = new Subject<void>();

  public isDone$ = this.isDone.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(TASKS_URL) private apiUrl: string
  ) {
    super(initialTasksState);
  }

  ngrxOnStoreInit() {
    this.http.get<TaskSummary[]>(this.apiUrl, {params: this.sizeParam})
      .subscribe(tasks => this.addTasks(tasks));
  }

  readonly addTasks = this.updater((state, tasks: TaskSummary[]) => {
    this.isLastPage(tasks);
    return {...state, tasks: [...state.tasks, ...tasks]};
  })

  private isLastPage(tasks: TaskSummary[]) {
    if (tasks.length < this.pageSize) {
      this.isDone.next();
      this.isDone.complete();
    }
  }

  tryLoadMore() {
    if (!this.isLoading) {
      this.isLoading = true;

      this.http.get<TaskSummary[]>(this.apiUrl, {params: this.sizeParam.set('page', ++this.page)})
        .subscribe(tasks => {
          this.addTasks(tasks);
          setTimeout(() => this.isLoading = false, 500);
        });
    }
  }


}
