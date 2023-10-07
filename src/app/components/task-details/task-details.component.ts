import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, MatChipsModule, NgOptimizedImage, RouterLink],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {

}
