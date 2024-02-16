import {Component, Input} from '@angular/core';
import {AgreementDetails, AgreementTaskSummary} from "@modules/agreements/model/AgreementSummary";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-agreement-task-details',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './agreement-task-details.component.html',
  styleUrl: './agreement-task-details.component.scss'
})
export class AgreementTaskDetailsComponent {

  taskDetails!: AgreementTaskSummary;
  @Input() set details(value: AgreementDetails) {
    this.taskDetails = value as AgreementTaskSummary;
  }
}
