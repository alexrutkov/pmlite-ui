import {Component, Input} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {concatMap, filter} from "rxjs";
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
		public accountStore: AccountStore,
		private messageService: MessageToastService,
		private http: HttpClient
	) {
	}

	cancelTask(task: TeamTask) {
		this.messageService.confirm(
			`Вы уверены, что хотите выйти отменить участие в команде?`,
			task.name
		).pipe(
			filter(isConfirmed => isConfirmed),
			concatMap(() => this.http.delete(`/api/teams/${task.teamId}/tasks/${task.taskId}`))
		).subscribe(() => this.messageService.info('Участие Деятеля отклонено!'));
	}
}
