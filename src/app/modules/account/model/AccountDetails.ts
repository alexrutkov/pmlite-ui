import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";
import {UserTeamRole} from "@modules/teams/model/UserTeamRole";

export interface AccountDetails {
  id: number;
  name: string;
  roles: string[];
  taskRoles: AccountTaskRole[];
  teamRoles: AccountTeamRole[];
}

export interface AccountTaskRole {
  taskId: number;
  role: keyof typeof UserTaskRole;
}

export interface AccountTeamRole {
	teamId: number;
	role: keyof typeof UserTeamRole;
}
