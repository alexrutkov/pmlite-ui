import {Component, Input} from '@angular/core';
import {AgreementDetails, AgreementTaskTeamSummary} from "@modules/agreements/model/AgreementSummary";

@Component({
  selector: 'app-agreement-task-teams-details',
  standalone: true,
  imports: [],
  templateUrl: './agreement-task-teams-details.component.html',
  styleUrl: './agreement-task-teams-details.component.scss'
})
export class AgreementTaskTeamsDetailsComponent {
  taskTeamDetails!: AgreementTaskTeamSummary;
  @Input() set details(value: AgreementDetails) {
    this.taskTeamDetails = value as AgreementTaskTeamSummary;
  }
}
