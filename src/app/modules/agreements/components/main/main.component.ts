import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AgreementTask, AgreementTaskType} from "@modules/agreements/model/AgreementTask";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  agreementTypes: {[key in keyof typeof AgreementTaskType]: string} = {
    'CREATE_TAG': 'Создание нового тега',
    'CREATE_TASK': 'Создание новой задачи',
    'PARTICIPATE_TEAM': 'Участие в команде',
    'PARTICIPATE_TASK': 'Участие в задаче'
  }
  typeControl = new FormControl<string>('', Validators.required);

  events: AgreementTask<any>[] = [
    {id: '1', type: 'CREATE_TAG', data: '', employer: {id: '2', name: 'Аланхея'} },
    {id: '1', type: 'CREATE_TASK', data: {name: 'Тестирую новую задачу'}, employer: {id: '2', name: 'Аланхея'}},
    {id: '1', type: 'PARTICIPATE_TEAM', data: {name: 'Команда номер 1'}, employer: {id: '2', name: 'Аланхея'}},
    {id: '1', type: 'PARTICIPATE_TASK', data: {name: 'Тестирую новую задачу'}, employer: {id: '2', name: 'Аланхея'}},
  ];
  filteredEvents: AgreementTask<any>[] = [];

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
