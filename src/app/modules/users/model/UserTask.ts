import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";

export interface UserTask {
  id: number;
  userId: number;
  taskId: number;
  name: string;
  createdAt: string;
  role: keyof typeof UserTaskRole;
}
