import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";
import {RouterLink} from "@angular/router";
import {AgreementShortDetailsComponent} from "@components/agreement-short-details/agreement-short-details.component";
import {Agreement} from "@modules/agreements/model/AgreementTask";

@Component({
  selector: 'app-employee-details',
  standalone: true,
    imports: [CommonModule, NgOptimizedImage, MatChipsModule, RouterLink, AgreementShortDetailsComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
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
