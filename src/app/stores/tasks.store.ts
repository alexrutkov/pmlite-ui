import {Injectable} from "@angular/core";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {initialTasksState, TasksState} from "@modules/tasks/model/TasksState";
import {TaskStorageService} from "@stores/services/task.storage.service";
import {Task} from "@modules/tasks/model/Task";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class TasksStore extends ComponentStore<TasksState> implements OnStoreInit {

  private isLoading = false;
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

  readonly addTasks = this.updater((state, tasks: Task[]) => {
    // this.taskStorage.saveState(currentState);
    return {...state, tasks: [...state.tasks, ...tasks]};
  })

  selectTask(taskId: string) {
    return this.select((state) => state.tasks.find(t => t.id == taskId)!);
  }

  tryLoadMore() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.http.get<TasksState>('/assets/tasks.json', {responseType: 'json'})
        .subscribe(s => {
          this.addTasks(s.tasks);
          setTimeout(() => this.isLoading = false, 500);
        });
    }
  }


}
