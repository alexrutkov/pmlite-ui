import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AutoloadStore} from "@core/AutoloadStore";
import {UserTask} from "@modules/users/model/UserTask";
import {WebsocketService} from "@services/websocket.service";
import {WebsocketEventType} from "@core/WebsocketEvent";
import {takeUntil} from "rxjs";


@Injectable()
export class UserTasksStore extends AutoloadStore<UserTask>  {


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
