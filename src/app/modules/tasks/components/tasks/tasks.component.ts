import {Component} from '@angular/core';
import {TasksStore} from "@stores/tasks.store";
import {EMPTY, Observable} from "rxjs";
import {Task} from "@modules/tasks/model/Task";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent{

  tasks$: Observable<Task[]> = EMPTY;
  constructor(private tasksStore: TasksStore) {
    this.tasks$ = this.tasksStore.select(s => s.tasks);
  }

}
