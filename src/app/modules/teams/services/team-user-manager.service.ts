import {Injectable} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {AccountState} from "@modules/account/model/AccountState";
import {concatMap, filter} from "rxjs";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {TeamUser} from "@modules/teams/model/TeamUser";
import {UserTeamRole} from "@modules/teams/model/UserTeamRole";
import {DashboardModule} from "@modules/dashboard/dashboard.module";

@Injectable({
  providedIn: DashboardModule
})
export class TeamUserManagerService {

  constructor(
		private accountStore: AccountStore,
		private messageService: MessageToastService,
		private http: HttpClient
	) { }

	canManageTeamUser(user: TeamUser) {
		return this.accountStore.select((state: AccountState) =>
			state.details.id == user.user.id
			&& state.details.teamRoles.map(r => r.teamId).includes(user.teamId)
		);
	}

	canCancelTeamUser(user: TeamUser) {
		return this.accountStore.select((state: AccountState) =>
			state.details.id != user.user.id
			&& state.details.teamRoles
				.find(r => r.teamId == user.teamId)
				?.role == UserTeamRole.OWNER
		);
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
