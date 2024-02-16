import {Component} from '@angular/core';
import {AgreementTask} from "@modules/agreements/model/AgreementTask";
import {TabRouterComponent} from "@core/TabRouterComponent";
import {AccountStore} from "@modules/account/account.store";
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

  events: AgreementTask<any>[] = [
    {id: '1', type: 'CREATE_TAG', data: '', employer: {id: '2', name: 'Аланхея'} },
    {id: '1', type: 'CREATE_TASK', data: {name: 'Тестирую новую задачу'}, employer: {id: '2', name: 'Аланхея'}},
    {id: '1', type: 'PARTICIPATE_TEAM', data: {name: 'Команда номер 1'}, employer: {id: '2', name: 'Аланхея'}},
    {id: '1', type: 'PARTICIPATE_TASK', data: {name: 'Тестирую новую задачу'}, employer: {id: '2', name: 'Аланхея'}},
  ];
  filteredEvents: AgreementTask<any>[] = [];

  constructor(
    private accountStore: AccountStore,
    private agreementStore: AgreementDetailsStore,
    router: Router
  ) {
    super(router);
    this.filteredEvents = this.events;
  }
}
