import {Component, ViewChild} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {DecisionDetailsComponent} from "@modules/decisions/components/decision-details/decision-details.component";
import {DecisionsStore} from "@modules/decisions/decisions.store";
import {tap} from "rxjs";
import {provideComponentStore} from "@ngrx/component-store";

@Component({
  selector: 'app-decisions',
  standalone: true,
	imports: [
		AsyncPipe,
		CdkFixedSizeVirtualScroll,
		CdkVirtualForOf,
		CdkVirtualScrollViewport,
		DecisionDetailsComponent
	],
  templateUrl: './decisions.component.html',
  styleUrl: './decisions.component.scss',
	providers: [
		provideComponentStore(DecisionsStore)
	]
})
export class DecisionsComponent {
	@ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

	protected readonly decisions$ = this.decisionStore.select(s => s)
		.pipe(tap(() => this.virtualScroll?.ngOnInit()))
	constructor(
		public decisionStore: DecisionsStore
	) {
	}
}
