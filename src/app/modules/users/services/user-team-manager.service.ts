import {Injectable} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {AccountState} from "@modules/account/model/AccountState";
import {concatMap, filter} from "rxjs";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {UserTeam} from "@modules/users/model/UserTeam";
import {UserTeamRole} from "@modules/teams/model/UserTeamRole";
import {DashboardModule} from "@modules/dashboard/dashboard.module";

@Injectable({
  providedIn: DashboardModule
})
export class UserTeamManagerService {

  constructor(
		private accountStore: AccountStore,
		private messageService: MessageToastService,
		private http: HttpClient
	) { }

	canManageUserTeam(userTeam: UserTeam) {
		return this.accountStore.select((state: AccountState) =>
			state.details.id == userTeam.userId
			&& state.details.teamRoles.map(r => r.teamId).includes(userTeam.teamId)
		);
	}

	canCancelUserTeam(userTeam: UserTeam) {
		return this.accountStore.select((state: AccountState) =>
			state.details.id == userTeam.userId
			&& state.details.teamRoles
				.find(r => r.teamId == userTeam.teamId)
				?.role != UserTeamRole.OWNER
		);
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
