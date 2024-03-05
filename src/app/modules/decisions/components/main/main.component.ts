import {Component} from '@angular/core';
import {
	AgreementShortDetailsComponent
} from "@modules/agreements/components/agreement-short-details/agreement-short-details.component";
import {AsyncPipe} from "@angular/common";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {DecisionDetailsComponent} from "@modules/decisions/components/decision-details/decision-details.component";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {TabRouterComponent} from "@core/TabRouterComponent";


@Component({
  selector: 'app-decisions-main',
  standalone: true,
	imports: [
		AgreementShortDetailsComponent,
		AsyncPipe,
		CdkVirtualForOf,
		CdkVirtualScrollViewport,
		DecisionDetailsComponent,
		CdkFixedSizeVirtualScroll,
		MatTabLink,
		MatTabNav,
		MatTabNavPanel,
		RouterOutlet,
		RouterLink
	],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent  extends TabRouterComponent {

  constructor(
		router: Router
  ) {
		super(router);

  }
}
