import {Component, Input} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatToolbar} from "@angular/material/toolbar";
import {TaskDetailsComponent} from "@modules/tasks/components/task-details/task-details.component";
import {UserDetailsComponent} from "@modules/users/components/user-details/user-details.component";
import {AgreementSummary, AgreementTaskTeamSummary} from "@modules/agreements/model/AgreementSummary";
import {TeamDetailsComponent} from "@modules/teams/components/team-details/team-details.component";

@Component({
  selector: 'app-agreement-task-team',
  standalone: true,
	imports: [
		MatTab,
		MatTabGroup,
		MatToolbar,
		TaskDetailsComponent,
		UserDetailsComponent,
		TeamDetailsComponent
	],
  templateUrl: './agreement-task-team.component.html',
  styleUrl: './agreement-task-team.component.scss'
})
export class AgreementTaskTeamComponent {
	details!: AgreementTaskTeamSummary;
	private _agreementSummary!: AgreementSummary;
	@Input() set agreement(value: AgreementSummary) {
		this._agreementSummary = value;
		this.details = value.details as AgreementTaskTeamSummary;
	}
	get agreement() {
		return this._agreementSummary;
	}
}
