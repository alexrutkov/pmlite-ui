import {Component} from '@angular/core';
import {TasksStore} from "../../../../stores/tasks.store";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private tasksStore: TasksStore) {
    this.tasksStore.select(s => s.tasks)
      .subscribe(t => console.log('TASK', t))
  }
}
