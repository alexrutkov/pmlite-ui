import {Component, Input} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {concatMap, filter} from "rxjs";
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
		public accountStore: AccountStore,
		private messageService: MessageToastService,
		private http: HttpClient
	) {
	}

	cancelTeam(userTask: UserTeam) {
		this.messageService.confirm(
			`Вы уверены, что хотите выйти из команды ${userTask.name}?`
		).pipe(
			filter(isConfirmed => isConfirmed),
			concatMap(() => this.http.delete(`/api/users/teams/${userTask.teamId}`))
		).subscribe(() => this.messageService.info('Выполнение задачи отменено!'));
	}
}
