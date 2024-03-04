import {Component, Input} from '@angular/core';
import {TeamTask} from "@modules/teams/model/TeamTask";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
	MatCard,
	MatCardActions,
	MatCardAvatar,
	MatCardFooter,
	MatCardHeader,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {TeamTaskManagerService} from "@modules/teams/services/team-task-manager.service";

@Component({
  selector: 'app-team-task-details',
  standalone: true,
	imports: [
		AsyncPipe,
		DatePipe,
		MatButton,
		MatCard,
		MatCardActions,
		MatCardAvatar,
		MatCardFooter,
		MatCardHeader,
		MatCardSubtitle,
		MatCardTitle,
		MatIcon,
		MatIconButton,
		MatMenu,
		MatMenuItem,
		NgIf,
		RouterLink,
		MatMenuTrigger
	],
  templateUrl: './team-task-details.component.html',
  styleUrl: './team-task-details.component.scss'
})
export class TeamTaskDetailsComponent {
	@Input({required: true}) teamTask!: TeamTask;

	constructor(
		public manager: TeamTaskManagerService
	) {
	}


}
