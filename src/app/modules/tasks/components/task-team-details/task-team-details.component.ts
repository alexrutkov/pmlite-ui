import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {concatMap, filter} from "rxjs";
import {TaskTeam} from "@modules/tasks/model/TaskTeam";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";

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
		public accountStore: AccountStore,
		private messageService: MessageToastService,
		private http: HttpClient
	) {
	}

	cancelTeam(team: TaskTeam) {
		this.messageService.confirm(
			`Вы уверены, что хотите отклонить Команду?`,
			team.name
		).pipe(
			filter(isConfirmed => isConfirmed),
			concatMap(() => this.http.delete(`/api/tasks/${team.taskId}/teams/${team.teamId}`))
		).subscribe(() => this.messageService.info('Деятель отклонен!'));
	}
}
