import {Injectable} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {AccountState} from "@modules/account/model/AccountState";
import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";
import {concatMap, filter} from "rxjs";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {TaskUser} from "@modules/tasks/model/TaskUser";
import {DashboardModule} from "@modules/dashboard/dashboard.module";

@Injectable({
  providedIn: DashboardModule
})
export class TaskUserManagerService {

  constructor(
		private accountStore: AccountStore,
		private messageService: MessageToastService,
		private http: HttpClient
	) { }

	canManageTaskUser(user: TaskUser) {
		return this.accountStore.select((state: AccountState) =>
			state.details.taskRoles
				.find(r => r.taskId == user.taskId)
				?.role == UserTaskRole.OWNER
		);
	}

	canCancelTaskUser(user: TaskUser) {
		return this.accountStore.select((state: AccountState) =>
			state.details.id != user.user.id
			&& state.details.taskRoles
				.find(r => r.taskId == user.taskId)
				?.role == UserTaskRole.OWNER
		);
	}

	cancelUser(user: TaskUser) {
		this.messageService.confirm(
			`Вы уверены, что хотите выйти отклонить Деятеля?`,
			user.user.name
		).pipe(
			filter(isConfirmed => isConfirmed),
			concatMap(() => this.http.delete(`/api/tasks/${user.taskId}/users/${user.user.id}`))
		).subscribe(() => this.messageService.info('Деятель отклонен!'));
	}
}
