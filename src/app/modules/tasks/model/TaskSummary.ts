

export interface TaskSummary {
  id: number;
  name: string;
  shortDescription: string;
  createdAt: string;
  users: TaskUser[];
}

export interface TaskUser {
  user: UserSummary;
  role: string;
}

export interface UserSummary {
  id: number;
  name: string;
}
