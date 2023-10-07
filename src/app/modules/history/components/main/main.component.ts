import {Component} from '@angular/core';
import {AgreementEvent} from "@modules/agreements/model/AgreementEvent";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  events: AgreementEvent<any>[] = [
    {id: '1', type: 'CREATE_TAG', data: ''},
    {id: '1', type: 'CREATE_TASK', data: {name: 'Тестирую новую задачу'}},
    {id: '1', type: 'PARTICIPATE_TEAM', data: {name: 'Команда номер 1'}},
    {id: '1', type: 'PARTICIPATE_TASK', data: {name: 'Тестирую новую задачу'}},
  ];
}
