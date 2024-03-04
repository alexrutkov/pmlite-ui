import {Injectable} from "@angular/core";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {HttpClient} from "@angular/common/http";
import {AccountState} from "@modules/account/model/AccountState";
import {AccountDetails} from "@modules/account/model/AccountDetails";
import {UserRole} from "@modules/account/model/AccountRole";
import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";
import {WebsocketService} from "@services/websocket.service";
import {WebsocketEventType} from "@core/WebsocketEvent";
import {UserTask} from "@modules/users/model/UserTask";
import {TaskUser} from "@modules/tasks/model/TaskUser";
import {TeamUser} from "@modules/teams/model/TeamUser";
import {UserTeamRole} from "@modules/teams/model/UserTeamRole";
import {TeamTask} from "@modules/teams/model/TeamTask";
import {UserTeam} from "@modules/users/model/UserTeam";


@Injectable()
export class AccountStore extends ComponentStore<AccountState> implements OnStoreInit {

  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService
  ) {
    super();
    this.websocketService.watchEventsByType(
      WebsocketEventType.ROLES_UPDATED,
      WebsocketEventType.TASK_UPDATED
    )
      .subscribe(() => this.ngrxOnStoreInit());
  }

  ngrxOnStoreInit(): void {
    this.http.get<AccountDetails>('/api/account/details')
      .subscribe(s => this.setState({details: s}));
  }

  hasRole(role: UserRole) {
    return this.select((state: AccountState) => state.details.roles.includes(role))
  }


  hasTaskRole(taskId: number, role: UserTaskRole) {
    return this.select((state: AccountState) =>
      !!state.details.taskRoles.find(r => r.role == role && r.taskId == taskId)
    );
  }

	hasTeamRole(teamId: number, role: UserTaskRole) {
		return this.select((state: AccountState) =>
			!!state.details.teamRoles.find(r => r.role == role && r.teamId == teamId)
		);
	}

  hasTask(taskId: number) {
    return this.select((state: AccountState) => state.details.taskRoles
			.map(r => r.taskId).includes(taskId)
		);
  }

	hasTeam(teamId: number) {
		return this.select((state: AccountState) => state.details.teamRoles
			.map(r => r.teamId).includes(teamId)
		);
	}

  canManageTask(task: UserTask) {
    return this.select((state: AccountState) =>
      state.details.id == task.userId
      && state.details.taskRoles.map(r => r.taskId).includes(task.taskId)
    );
  }

  canCancelTask(task: UserTask) {
    return this.select((state: AccountState) =>
      state.details.id == task.userId
      && state.details.taskRoles.map(r => r.taskId).includes(task.taskId)
      && task.role != UserTaskRole.OWNER
    );
  }

  canManageTaskUser(user: TaskUser) {
    return this.select((state: AccountState) =>
      state.details.taskRoles
        .find(r => r.taskId == user.taskId)
        ?.role == UserTaskRole.OWNER
    );
  }

	canManageTeamUser(user: TeamUser) {
		return this.select((state: AccountState) =>
			state.details.id == user.user.id
			&& state.details.teamRoles.map(r => r.teamId).includes(user.teamId)
		);
	}

	canManageUserTeam(userTeam: UserTeam) {
		return this.select((state: AccountState) =>
			state.details.id == userTeam.userId
			&& state.details.teamRoles.map(r => r.teamId).includes(userTeam.teamId)
		);
	}

	canManageTeamTask(teamTask: TeamTask) {
		return this.select((state: AccountState) =>
			state.details.teamRoles
				.find(r => r.teamId == teamTask.teamId)
				?.role == UserTeamRole.OWNER
		);
	}

  canCancelTaskUser(user: TaskUser) {
    return this.select((state: AccountState) =>
      state.details.id != user.user.id
      && state.details.taskRoles
        .find(r => r.taskId == user.taskId)
        ?.role == UserTaskRole.OWNER
    );
  }

	canCancelUserTeam(userTeam: UserTeam) {
		return this.select((state: AccountState) =>
			state.details.id == userTeam.userId
			&& state.details.teamRoles
				.find(r => r.teamId == userTeam.teamId)
				?.role != UserTeamRole.OWNER
		);
	}



	canCancelTeamUser(user: TeamUser) {
		return this.select((state: AccountState) =>
			state.details.id != user.user.id
			&& state.details.teamRoles
				.find(r => r.teamId == user.teamId)
				?.role == UserTeamRole.OWNER
		);
	}
}
