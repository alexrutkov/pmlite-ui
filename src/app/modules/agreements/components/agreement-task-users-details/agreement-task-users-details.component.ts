import {Component, Input} from '@angular/core';
import {AgreementDetails, AgreementTaskSummary} from "@modules/agreements/model/AgreementSummary";

@Component({
  selector: 'app-agreement-task-users-details',
  standalone: true,
  imports: [],
  templateUrl: './agreement-task-users-details.component.html',
  styleUrl: './agreement-task-users-details.component.scss'
})
export class AgreementTaskUsersDetailsComponent {
  taskDetails!: AgreementTaskSummary;
  @Input() set details(value: AgreementDetails) {
    this.taskDetails = value as AgreementTaskSummary;
  }
}
