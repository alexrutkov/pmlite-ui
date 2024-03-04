import {Injectable} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {AccountState} from "@modules/account/model/AccountState";
import {concatMap, filter} from "rxjs";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {UserTeamRole} from "@modules/teams/model/UserTeamRole";
import {TeamTask} from "@modules/teams/model/TeamTask";
import {DashboardModule} from "@modules/dashboard/dashboard.module";

@Injectable({
  providedIn: DashboardModule
})
export class TeamTaskManagerService {

  constructor(
		private accountStore: AccountStore,
		private messageService: MessageToastService,
		private http: HttpClient
	) { }

	canManageTeamTask(teamTask: TeamTask) {
		return this.accountStore.select((state: AccountState) =>
			state.details.taskRoles.map(r => r.taskId).includes(teamTask.taskId)
		);
	}

	canCancelTeamTask(user: TeamTask) {
		return this.accountStore.select((state: AccountState) =>
			state.details.teamRoles
				.find(r => r.teamId == user.teamId)
				?.role == UserTeamRole.OWNER
		);
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
