import {Component, Input} from '@angular/core';
import {AgreementSummary, AgreementTagSummary} from "@modules/agreements/model/AgreementSummary";
import {MatToolbar} from "@angular/material/toolbar";
import {MatChip} from "@angular/material/chips";
import {UserDetailsComponent} from "@modules/users/components/user-details/user-details.component";

@Component({
	selector: 'app-agreement-tag',
	standalone: true,
	templateUrl: './agreement-tag.component.html',
	imports: [
		MatToolbar,
		MatChip,
		UserDetailsComponent
	],
	styleUrls: ['./agreement-tag.component.scss']
})
export class AgreementTagComponent {

	details!: AgreementTagSummary;
	private _agreementSummary!: AgreementSummary;
	@Input() set agreement(value: AgreementSummary) {
		this._agreementSummary = value;
		this.details = value.details as AgreementTagSummary;
	}
	get agreement() {
		return this._agreementSummary;
	}

}
