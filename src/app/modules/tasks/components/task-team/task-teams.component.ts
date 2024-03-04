import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {EMPTY, Observable, tap} from "rxjs";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {TaskTeamsStore} from "@modules/tasks/stores/task-teams.store";
import {TaskTeam} from "@modules/tasks/model/TaskTeam";
import {provideComponentStore} from "@ngrx/component-store";
import {AsyncPipe, NgIf} from "@angular/common";
import {TaskUserDetailsComponent} from "@modules/tasks/components/task-user-details/task-user-details.component";
import {TaskTeamDetailsComponent} from "@modules/tasks/components/task-team-details/task-team-details.component";

@Component({
  selector: 'app-task-teams',
  standalone: true,
	imports: [
		AsyncPipe,
		CdkFixedSizeVirtualScroll,
		CdkVirtualForOf,
		CdkVirtualScrollViewport,
		NgIf,
		TaskUserDetailsComponent,
		TaskTeamDetailsComponent
	],
  templateUrl: './task-teams.component.html',
  styleUrl: './task-teams.component.scss',
	providers: [
		provideComponentStore(TaskTeamsStore)
	]
})
export class TaskTeamsComponent implements AfterViewInit {

@Input() set taskId(id: number) {
		this.taskTeamsStore.setApiUrl(`/api/tasks/${id}/teams`);
	}


	teams$: Observable<TaskTeam[]> = EMPTY;

@ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

	constructor(
		public taskTeamsStore: TaskTeamsStore
) {
		this.teams$ = this.taskTeamsStore.select(s => s)
			.pipe(tap(() => this.virtualScroll?.ngOnInit()));
	}

	ngAfterViewInit(): void {
		this.taskTeamsStore.initAutoloadStore(this.virtualScroll);
	}

}
