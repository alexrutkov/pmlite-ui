import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AgreementEvent, AgreementType} from "@modules/agreements/model/AgreementEvent";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  agreementTypes: {[key in keyof typeof AgreementType]: string} = {
    'CREATE_TAG': 'Создание нового тега',
    'CREATE_TASK': 'Создание новой задачи',
    'PARTICIPATE_TEAM': 'Участие в команде',
    'PARTICIPATE_TASK': 'Участие в задаче'
  }
  typeControl = new FormControl<string>('', Validators.required);

  events: AgreementEvent<any>[] = [
    {id: '1', type: 'CREATE_TAG', data: ''},
    {id: '1', type: 'CREATE_TASK', data: {name: 'Тестирую новую задачу'}},
    {id: '1', type: 'PARTICIPATE_TEAM', data: {name: 'Команда номер 1'}},
    {id: '1', type: 'PARTICIPATE_TASK', data: {name: 'Тестирую новую задачу'}},
  ];
  filteredEvents: AgreementEvent<any>[] = [];

  constructor() {
    this.filteredEvents = this.events;
    this.typeControl.valueChanges
      .subscribe(t => {
        if (t !== '') {
          this.filteredEvents = this.events.filter(e => e.type == t);
        } else this.filteredEvents = this.events;
      })
  }
}
