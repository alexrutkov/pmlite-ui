import {Component, Input} from '@angular/core';
import {AgreementSummary, AgreementTeamSummary} from "@modules/agreements/model/AgreementSummary";
import {MatChip} from "@angular/material/chips";
import {MatToolbar} from "@angular/material/toolbar";
import {UserDetailsComponent} from "@modules/users/components/user-details/user-details.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {TeamDetailsComponent} from "@modules/teams/components/team-details/team-details.component";

@Component({
	selector: 'app-agreement-team',
	standalone: true,
	templateUrl: './agreement-team.component.html',
	imports: [
		MatChip,
		MatToolbar,
		UserDetailsComponent,
		MatTabGroup,
		MatTab,
		TeamDetailsComponent
	],
	styleUrls: ['./agreement-team.component.scss']
})
export class AgreementTeamComponent {
	details!: AgreementTeamSummary;
	private _agreementSummary!: AgreementSummary;
	@Input() set agreement(value: AgreementSummary) {
		this._agreementSummary = value;
		this.details = value.details as AgreementTeamSummary;
	}
	get agreement() {
		return this._agreementSummary;
	}


}
