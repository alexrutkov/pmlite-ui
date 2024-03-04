import {Injectable} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {UserTask} from "@modules/users/model/UserTask";
import {AccountState} from "@modules/account/model/AccountState";
import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";
import {concatMap, filter} from "rxjs";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {DashboardModule} from "@modules/dashboard/dashboard.module";

@Injectable({
  providedIn: DashboardModule
})
export class UserTaskManagerService {

  constructor(
		private accountStore: AccountStore,
		private messageService: MessageToastService,
		private http: HttpClient
	) { }

	canManageTask(task: UserTask) {
		return this.accountStore.select((state: AccountState) =>
			state.details.id == task.userId
			&& state.details.taskRoles.map(r => r.taskId).includes(task.taskId)
		);
	}

	canCancelTask(task: UserTask) {
		return this.accountStore.select((state: AccountState) =>
			state.details.id == task.userId
			&& state.details.taskRoles.map(r => r.taskId).includes(task.taskId)
			&& task.role != UserTaskRole.OWNER
		);
	}

	cancelTask(userTask: UserTask) {
		this.messageService.confirm(
			`Вы уверены, что хотите выйти из выполнения задачи ${userTask.name}?`
		).pipe(
			filter(isConfirmed => isConfirmed),
			concatMap(() => this.http.delete(`/api/users/tasks/${userTask.taskId}`))
		).subscribe(() => this.messageService.info('Выполнение задачи отменено!'));
	}
}
