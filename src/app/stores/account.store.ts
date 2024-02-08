import {Injectable} from "@angular/core";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {HttpClient} from "@angular/common/http";
import {AccountState} from "@modules/account/model/AccountState";
import {AccountDetails} from "@modules/account/model/AccountDetails";
import {UserRole} from "@modules/account/model/AccountRole";
import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";
import {WebsocketService} from "@services/websocket.service";
import {WebsocketEventType} from "@core/WebsocketEvent";


@Injectable()
export class AccountStore extends ComponentStore<AccountState> implements OnStoreInit {

  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService
  ) {
    super();
    this.websocketService.watchEventsByType(WebsocketEventType.ROLES_UPDATED)
      .subscribe(() => this.ngrxOnStoreInit());
  }

  ngrxOnStoreInit(): void {
    this.http.get<AccountDetails>('/api/account/details')
      .subscribe(s => this.setState({details: s}));
  }

  hasRole(role: UserRole) {
    return this.select((state: AccountState) => state.details.roles.includes(role))
  }


  hasTaskRole(taskId: number, role: UserTaskRole) {
    return this.select((state: AccountState) =>
      !!state.details.taskRoles.find(r => r.role == role && r.taskId == taskId)
    );
  }

  hasTask(taskId: number) {
    return this.select((state: AccountState) => state.details.taskRoles.map(r => r.taskId).includes(taskId));
  }
}
