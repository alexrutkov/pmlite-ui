import {Component, OnInit} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {UserRole} from "@modules/account/model/AccountRole";
import {AgreementDetailsStore} from "@modules/agreements/agreement-details.store";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  enableCreateTask$ = this.accountStore.hasRole(UserRole.ROLE_TASK_CREATOR);
  totalAgreements$ = this.agreementStore.totalAgreements();
  constructor(
    public accountStore: AccountStore,
    private agreementStore: AgreementDetailsStore
  ) {
  }
  ngOnInit(): void {
  }


}
