import {Component} from '@angular/core';
import {AgreementDetailsStore} from "@modules/agreements/agreement-details.store";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {MatBadge} from "@angular/material/badge";

@Component({
  selector: 'app-agreement-summary',
  standalone: true,
	imports: [
		MatNavList,
		MatIcon,
		MatListItem,
		RouterLink,
		AsyncPipe,
		MatBadge
	],
  templateUrl: './agreement-summary.component.html',
  styleUrl: './agreement-summary.component.scss'
})
export class AgreementSummaryComponent {

	details$ = this.agreementsStore
		.select(s => s.details.agreementDetails.filter(d => d.count > 0));
	constructor(
		private agreementsStore: AgreementDetailsStore
	) {
	}


}
