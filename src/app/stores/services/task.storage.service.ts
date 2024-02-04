import {Injectable} from '@angular/core';
import {LocalStorageService} from "@services/local.storage.service";
import {TasksState} from "@modules/tasks/model/TasksState";

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  private id = '[TASKS.STATE]'
  constructor(
    private storageService: LocalStorageService<TasksState>
  ) { }


  getState() {
    return this.storageService.getById(this.id);
  }

  saveState(currentState: TasksState) {
    return this.storageService.save(this.id, currentState);
  }
}
