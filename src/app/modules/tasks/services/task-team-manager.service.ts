import {Injectable} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {AccountState} from "@modules/account/model/AccountState";
import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";
import {concatMap, filter} from "rxjs";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {TaskTeam} from "@modules/tasks/model/TaskTeam";
import {UserTeamRole} from "@modules/teams/model/UserTeamRole";
import {DashboardModule} from "@modules/dashboard/dashboard.module";

@Injectable({
  providedIn: DashboardModule
})
export class TaskTeamManagerService {

  constructor(
		private accountStore: AccountStore,
		private messageService: MessageToastService,
		private http: HttpClient
	) { }

	canManageTaskTeam(taskTeam: TaskTeam) {
		return this.accountStore.select((state: AccountState) =>
			state.details.teamRoles.map(r => r.teamId).includes(taskTeam.teamId)
		);
	}

	canCancelTaskTeam(taskTeam: TaskTeam) {
		return this.accountStore.select((state: AccountState) =>
			state.details.teamRoles
				.find(r => r.teamId == taskTeam.teamId)
				?.role == UserTeamRole.OWNER
			|| state.details.taskRoles
				.find(r => r.taskId == taskTeam.taskId)
				?.role == UserTaskRole.OWNER
		);
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
