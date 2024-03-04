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
import {AccountStore} from "@modules/account/account.store";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {concatMap, filter} from "rxjs";
import {RouterLink} from "@angular/router";

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
		MatMenuTrigger
	],
  templateUrl: './team-user-details.component.html',
  styleUrl: './team-user-details.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamUserDetailsComponent {

	@Input({required: true}) teamUser!: TeamUser;

	constructor(
		public accountStore: AccountStore,
		private messageService: MessageToastService,
		private http: HttpClient
	) {
	}

	cancelUser(user: TeamUser) {
		this.messageService.confirm(
			`Вы уверены, что хотите выйти отменить участие Деятеля?`,
			user.user.name
		).pipe(
			filter(isConfirmed => isConfirmed),
			concatMap(() => this.http.delete(`/api/teams/${user.teamId}/users/${user.user.id}`))
		).subscribe(() => this.messageService.info('Участие Деятеля отклонено!'));
	}
}
