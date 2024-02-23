import {Inject, Injectable} from "@angular/core";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {HttpClient} from "@angular/common/http";
import {TASKS_URL} from "@modules/tasks/tokens";
import {AutoloadStore} from "@core/AutoloadStore";


@Injectable()
export class TasksStore extends AutoloadStore<TaskSummary> {
  constructor(
    http: HttpClient,
    @Inject(TASKS_URL) apiUrl: string
  ) {
    super(http, apiUrl);
  }

}
