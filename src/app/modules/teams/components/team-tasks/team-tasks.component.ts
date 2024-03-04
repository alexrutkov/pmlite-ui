import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {EMPTY, Observable, tap} from "rxjs";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {provideComponentStore} from "@ngrx/component-store";
import {TeamTasksStore} from "@modules/teams/stores/team-tasks.store";
import {TeamTask} from "@modules/teams/model/TeamTask";
import {AsyncPipe, NgIf} from "@angular/common";
import {TeamUserDetailsComponent} from "@modules/teams/components/team-user-details/team-user-details.component";
import {TeamTaskDetailsComponent} from "@modules/teams/components/team-task-details/team-task-details.component";

@Component({
  selector: 'app-team-tasks',
  standalone: true,
	imports: [
		AsyncPipe,
		CdkFixedSizeVirtualScroll,
		CdkVirtualForOf,
		CdkVirtualScrollViewport,
		NgIf,
		TeamUserDetailsComponent,
		TeamTaskDetailsComponent
	],
  templateUrl: './team-tasks.component.html',
  styleUrl: './team-tasks.component.scss',
	providers: [
		provideComponentStore(TeamTasksStore)
	]
})
export class TeamTasksComponent  implements AfterViewInit {
	@Input({required: true}) set teamId(id: number) {
		this.teamUsersStore.setApiUrl(`/api/teams/${id}/tasks`);
	}

	task$: Observable<TeamTask[]> = EMPTY;

	@ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

	constructor(
		public teamUsersStore: TeamTasksStore
	) {
		this.task$ = this.teamUsersStore.select(s => s)
			.pipe(tap(() => this.virtualScroll?.ngOnInit()));
	}

	ngAfterViewInit(): void {
		this.teamUsersStore.initAutoloadStore(this.virtualScroll);
	}
}
