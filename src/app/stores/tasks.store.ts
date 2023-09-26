import {Injectable} from "@angular/core";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {initialTasksState, TasksState} from "@modules/tasks/model/TasksState";
import {TaskStorageService} from "@services/task.storage.service";
import {Task} from "@modules/tasks/model/Task";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class TasksStore extends ComponentStore<TasksState> implements OnStoreInit {

  constructor(
    private taskStorage: TaskStorageService,
    private http: HttpClient,
    private messageService: MessageToastService
  ) {
    super(initialTasksState);
  }

  ngrxOnStoreInit() {
    const init = this.taskStorage.getState()
    this.setState(() => init ? init : initialTasksState);
    this.http.get<TasksState>('/assets/tasks.json', {responseType: 'json'})
      .subscribe(s => this.setState(() => s));
  }

/*  readonly saveTask = this.effect((task$: Observable<Task>) => {
    return task$.pipe(
      tap(task => {
        this.taskStorage.saveTask()
      })
    )
  })*/

  readonly saveTask = this.updater((state, task: Task) => {
    const currentState = {...state, tasks: [...state.tasks, {...task, createdAt: new Date().toUTCString()}]};
    this.taskStorage.saveState(currentState);
    this.messageService.success('Задача создана!')
    return currentState;
  })
}
