import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountStore} from "@stores/account.store";
import {UserRole} from "@modules/account/model/AccountRole";
import {WebsocketService} from "@services/websocket.service";
import {WebsocketEventType} from "@core/WebsocketEvent";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  enableCreateTask$ = this.accountStore.hasRole(UserRole.ROLE_TASK_CREATOR);
  constructor(
    private http: HttpClient,
    public accountStore: AccountStore,
    private websocketService: WebsocketService
  ) {
  }
  ngOnInit(): void {
    this.websocketService.watchEventsByType(WebsocketEventType.ROLES_UPDATED)
      .subscribe(() => console.log('ROLES_UPDATED come', 'main'));
  }


}
