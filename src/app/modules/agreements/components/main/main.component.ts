import {Component} from '@angular/core';
import {TabRouterComponent} from "@core/TabRouterComponent";
import {AgreementDetailsStore} from "@modules/agreements/agreement-details.store";
import {AgreementType} from "@modules/agreements/model/AgreementType";
import {Router} from "@angular/router";

@Component({
  selector: 'app-agreements-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends TabRouterComponent{
  countTaskAgreement$ = this.agreementStore.countByTypes(AgreementType.TASK);
  countTaskUsersAgreement$ = this.agreementStore.countByTypes(AgreementType.TASK_USER);
  countTaskTeamsAgreement$ = this.agreementStore.countByTypes(AgreementType.TASK_TEAM);
  countTeamUsersAgreement$ = this.agreementStore.countByTypes(AgreementType.TEAM_USER);
  countTagAgreement$ = this.agreementStore.countByTypes(AgreementType.TAG);


  constructor(
    private agreementStore: AgreementDetailsStore,
    router: Router
  ) {
    super(router);
  }
}
