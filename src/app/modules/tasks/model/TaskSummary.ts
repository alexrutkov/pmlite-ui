

export interface TaskSummary {
  id: number;
  name: string;
  shortDescription: string;
  createdAt: string;
  users: TaskUser[];
}

export interface TaskUser {
  user: TaskUserSummary;
  role: string;
}

export interface TaskUserSummary {
  id: number;
  name: string;
}
