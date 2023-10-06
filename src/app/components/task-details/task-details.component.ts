import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, MatChipsModule, NgOptimizedImage],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {

}
