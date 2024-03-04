import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AutoloadStore} from "@core/AutoloadStore";
import {WebsocketService} from "@services/websocket.service";
import {WebsocketEventType} from "@core/WebsocketEvent";
import {takeUntil} from "rxjs";
import {TeamTask} from "@modules/teams/model/TeamTask";


@Injectable()
export class TeamTasksStore extends AutoloadStore<TeamTask>  {


  constructor(
    http: HttpClient,
    private websocketService: WebsocketService
  ) {
    super(http);
    this.websocketService.watchEventsByType(WebsocketEventType.TEAM_UPDATED)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.ngrxOnStoreInit());
  }



}
