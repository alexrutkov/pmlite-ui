import {Component, Input} from '@angular/core';
import {Task} from "@modules/tasks/model/Task";

@Component({
  selector: 'app-task-short-details',
  templateUrl: './task-short-details.component.html',
  styleUrl: './task-short-details.component.scss'
})
export class TaskShortDetailsComponent {

  @Input() task!: Task;
}
