import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {RouterLink} from "@angular/router";
import {Agreement, AgreementTaskType} from "@modules/agreements/model/AgreementTask";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-agreement-short-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatChipsModule, RouterLink, MatIconModule],
  templateUrl: './agreement-short-details.component.html',
  styleUrls: ['./agreement-short-details.component.scss']
})
export class AgreementShortDetailsComponent {
  @Input() agreement!: Agreement<any>;
  agreementTypes: {[key in keyof typeof AgreementTaskType]: string} = {
    'CREATE_TAG': 'Создание нового тега',
    'CREATE_TASK': 'Создание новой задачи',
    'PARTICIPATE_TEAM': 'Участие в команде',
    'PARTICIPATE_TASK': 'Участие в задаче'
  }
}
