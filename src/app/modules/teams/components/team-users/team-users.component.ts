import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {EMPTY, Observable, tap} from "rxjs";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {TeamUsersStore} from "@modules/teams/stores/team-users.store";
import {provideComponentStore} from "@ngrx/component-store";
import {TeamUser} from "@modules/teams/model/TeamUser";
import {AsyncPipe, NgIf} from "@angular/common";
import {TaskUserDetailsComponent} from "@modules/tasks/components/task-user-details/task-user-details.component";
import {TeamUserDetailsComponent} from "@modules/teams/components/team-user-details/team-user-details.component";

@Component({
  selector: 'app-team-users',
  standalone: true,
	imports: [
		AsyncPipe,
		CdkFixedSizeVirtualScroll,
		CdkVirtualForOf,
		CdkVirtualScrollViewport,
		NgIf,
		TaskUserDetailsComponent,
		TeamUserDetailsComponent
	],
  templateUrl: './team-users.component.html',
  styleUrl: './team-users.component.scss',
	providers: [
		provideComponentStore(TeamUsersStore)
	]
})
export class TeamUsersComponent  implements AfterViewInit {

	@Input({required: true}) set teamId(id: number) {
		this.teamUsersStore.setApiUrl(`/api/teams/${id}/users`);
	}

	users$: Observable<TeamUser[]> = EMPTY;

	@ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

	constructor(
		public teamUsersStore: TeamUsersStore
	) {
		this.users$ = this.teamUsersStore.select(s => s)
			.pipe(tap(() => this.virtualScroll?.ngOnInit()));
	}

	ngAfterViewInit(): void {
		this.teamUsersStore.initAutoloadStore(this.virtualScroll);
	}
}
