import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AutoloadStore} from "@core/AutoloadStore";
import {WebsocketService} from "@services/websocket.service";
import {WebsocketEventType} from "@core/WebsocketEvent";
import {takeUntil} from "rxjs";
import {TaskUser} from "@modules/tasks/model/TaskUser";


@Injectable()
export class TaskUsersStore extends AutoloadStore<TaskUser>  {


  constructor(
    http: HttpClient,
    private websocketService: WebsocketService
  ) {
    super(http);
    this.websocketService.watchEventsByType(WebsocketEventType.TASK_UPDATED)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.ngrxOnStoreInit());
  }



}
