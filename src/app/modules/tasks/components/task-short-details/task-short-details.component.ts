import {Component, Input} from '@angular/core';
import {TaskSummary} from "@modules/tasks/model/TaskSummary";

@Component({
  selector: 'app-task-short-details',
  templateUrl: './task-short-details.component.html',
  styleUrl: './task-short-details.component.scss'
})
export class TaskShortDetailsComponent {

  @Input() task!: TaskSummary;
}
