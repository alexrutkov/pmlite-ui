import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountStore} from "@stores/account.store";
import {UserRole} from "@modules/account/model/AccountRole";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  enableCreateTask$ = this.accountStore.hasRole(UserRole.ROLE_TASK_CREATOR);
  constructor(
    private http: HttpClient,
    public accountStore: AccountStore
  ) {
  }
  ngOnInit(): void {

  }


}
