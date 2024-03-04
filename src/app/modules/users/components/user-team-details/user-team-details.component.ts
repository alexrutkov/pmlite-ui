import {Component, Input} from '@angular/core';
import {UserTeam} from "@modules/users/model/UserTeam";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
	MatCard,
	MatCardActions,
	MatCardFooter,
	MatCardHeader,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {UserTeamManagerService} from "@modules/users/services/user-team-manager.service";

@Component({
  selector: 'app-user-team-details',
  standalone: true,
	imports: [
		AsyncPipe,
		DatePipe,
		MatButton,
		MatCard,
		MatCardActions,
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
  templateUrl: './user-team-details.component.html',
  styleUrl: './user-team-details.component.scss'
})
export class UserTeamDetailsComponent {
	@Input({required: true}) userTeam!: UserTeam;

	constructor(
		public manager: UserTeamManagerService
	) {
	}
}
