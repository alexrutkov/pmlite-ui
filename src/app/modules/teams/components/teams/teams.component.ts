import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {SearchComponent} from "@components/search/search.component";
import {TeamShortDetailsComponent} from "@modules/teams/components/team-short-details/team-short-details.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {EMPTY, Observable, tap} from "rxjs";
import {TeamsStore} from "@modules/teams/stores/teams.store";
import {TeamSummary} from "@modules/teams/model/TeamSummary";
import {provideComponentStore} from "@ngrx/component-store";

@Component({
  selector: 'app-teams',
  standalone: true,
	imports: [
		AsyncPipe,
		CdkFixedSizeVirtualScroll,
		CdkVirtualForOf,
		CdkVirtualScrollViewport,
		SearchComponent,
		TeamShortDetailsComponent,
		ReactiveFormsModule
	],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
	providers: [
		provideComponentStore(TeamsStore)
	]
})
export class TeamsComponent implements AfterViewInit {
	teams$: Observable<TeamSummary[]> = EMPTY;

	@ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

	searchControl = new FormControl('');

	constructor(
		public teamsStore: TeamsStore
	) {
		this.teams$ = this.teamsStore.select(s => s)
			.pipe(tap(() => this.virtualScroll?.ngOnInit()));
		this.searchControl.valueChanges.subscribe(v => this.teamsStore.setSearch(v))
	}

	ngAfterViewInit(): void {
		this.teamsStore.initAutoloadStore(this.virtualScroll);
	}
}
