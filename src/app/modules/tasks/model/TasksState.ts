import {Task} from "@modules/tasks/model/Task";

export interface TasksState {
  tasks: Task[];
}

export const initialTasksState: TasksState = {
  tasks: []
};
