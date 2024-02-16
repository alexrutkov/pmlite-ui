import {Component, Input} from '@angular/core';
import {AgreementDetails, AgreementTeamSummary} from "@modules/agreements/model/AgreementSummary";

@Component({
  selector: 'app-agreement-team-users-details',
  standalone: true,
  imports: [],
  templateUrl: './agreement-team-users-details.component.html',
  styleUrl: './agreement-team-users-details.component.scss'
})
export class AgreementTeamUsersDetailsComponent {
  teamDetails!: AgreementTeamSummary;
  @Input() set details(value: AgreementDetails) {
    this.teamDetails = value as AgreementTeamSummary;
  }
}
