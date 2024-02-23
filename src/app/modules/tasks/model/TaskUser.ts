import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";
import {UserSummary} from "@modules/users/model/UserSummary";

export interface TaskUser {
  id: number;
  taskId: number;
  user: UserSummary;
  createdAt: string;
  role: keyof typeof UserTaskRole;
}
