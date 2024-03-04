import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TaskTeam} from "@modules/tasks/model/TaskTeam";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {TaskTeamManagerService} from "@modules/tasks/services/task-team-manager.service";

@Component({
  selector: 'app-task-team-details',
  standalone: true,
	imports: [
		AsyncPipe,
		DatePipe,
		MatButton,
		MatCard,
		MatCardActions,
		MatCardFooter,
		MatCardHeader,
		MatCardTitle,
		MatIcon,
		MatIconButton,
		MatMenu,
		MatMenuItem,
		NgIf,
		RouterLink,
		MatMenuTrigger
	],
  templateUrl: './task-team-details.component.html',
  styleUrl: './task-team-details.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskTeamDetailsComponent {
	@Input({required: true}) taskTeam!: TaskTeam;

	constructor(
		public manager: TaskTeamManagerService
	) {
	}


}
