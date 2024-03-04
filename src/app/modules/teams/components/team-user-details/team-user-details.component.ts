import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TeamUser} from "@modules/teams/model/TeamUser";
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
import {TeamUserManagerService} from "@modules/teams/services/team-user-manager.service";
import {AvatarComponent} from "@components/avatar/avatar.component";

@Component({
  selector: 'app-team-user-details',
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
		MatMenuTrigger,
		AvatarComponent
	],
  templateUrl: './team-user-details.component.html',
  styleUrl: './team-user-details.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamUserDetailsComponent {

	@Input({required: true}) teamUser!: TeamUser;

	constructor(
		public manager: TeamUserManagerService
	) {
	}


}
