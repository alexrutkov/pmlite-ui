import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UserTaskDetailsComponent} from "@modules/users/components/user-task-details/user-task-details.component";
import {EMPTY, Observable, tap} from "rxjs";
import {UserTeamsStore} from "@modules/users/stores/user-teams.store";
import {UserTeam} from "@modules/users/model/UserTeam";
import {provideComponentStore} from "@ngrx/component-store";
import {UserTeamDetailsComponent} from "@modules/users/components/user-team-details/user-team-details.component";

@Component({
  selector: 'app-user-teams',
  standalone: true,
	imports: [
		AsyncPipe,
		CdkFixedSizeVirtualScroll,
		CdkVirtualForOf,
		CdkVirtualScrollViewport,
		NgIf,
		UserTaskDetailsComponent,
		UserTeamDetailsComponent
	],
  templateUrl: './user-teams.component.html',
  styleUrl: './user-teams.component.scss',
	providers: [
		provideComponentStore(UserTeamsStore)
	]
})
export class UserTeamsComponent implements AfterViewInit {

	@Input()
	set userId(id: number) {
		this.userTasksStore.setApiUrl(`/api/users/${id}/teams`);
	}

	team$: Observable<UserTeam[]> = EMPTY;

	@ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

	constructor(
		public userTasksStore: UserTeamsStore
	) {
		this.team$ = this.userTasksStore.select(s => s)
			.pipe(tap(() => this.virtualScroll?.ngOnInit()));
	}

	ngAfterViewInit(): void {
		this.userTasksStore.initAutoloadStore(this.virtualScroll);
	}
}
