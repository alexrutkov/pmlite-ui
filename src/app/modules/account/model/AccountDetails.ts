import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";

export interface AccountDetails {
  id: number;
  name: string;
  roles: string[];
  taskRoles: AccountTaskRole[];
}

export interface AccountTaskRole {
  taskId: number;
  role: keyof typeof UserTaskRole;
}
