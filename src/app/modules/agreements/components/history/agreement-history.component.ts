import {Component} from '@angular/core';
import {Agreement} from "@modules/agreements/model/AgreementTask";

@Component({
  selector: 'app-history',
  templateUrl: './agreement-history.component.html',
  styleUrls: ['./agreement-history.component.scss']
})
export class AgreementHistoryComponent {
  events: Agreement<any>[] = [
    {
      id: '1', type: 'DECLINED', task: {
        id: '1', type: 'CREATE_TAG', data: {name: 'Новый тег'},
        employer: {id: '2', name: 'Аланхея'}
      },
      agreementBy: {id: '3', name: 'Анхей'}, agreementAt: new Date().toUTCString()
    },
  ];
}
