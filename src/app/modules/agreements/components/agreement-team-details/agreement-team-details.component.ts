import {Component, Input} from '@angular/core';
import {AgreementDetails, AgreementTeamSummary} from "@modules/agreements/model/AgreementSummary";

@Component({
  selector: 'app-agreement-team-details',
  standalone: true,
  imports: [],
  templateUrl: './agreement-team-details.component.html',
  styleUrl: './agreement-team-details.component.scss'
})
export class AgreementTeamDetailsComponent {

	taskDetails!: AgreementTeamSummary;
	@Input() set details(value: AgreementDetails) {
		this.taskDetails = value as AgreementTeamSummary;
	}
}
