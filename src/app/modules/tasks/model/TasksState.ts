import {TaskSummary} from "@modules/tasks/model/TaskSummary";

export interface TasksState {
  tasks: TaskSummary[];
}

export const initialTasksState: TasksState = {
  tasks: []
};
