import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
	MatCard,
	MatCardActions,
	MatCardContent,
	MatCardFooter,
	MatCardHeader,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {UserTask} from "@modules/users/model/UserTask";
import {RouterLink} from "@angular/router";
import {UserTaskManagerService} from "@modules/users/services/user-task-manager.service";

@Component({
  selector: 'app-user-task-details',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    AsyncPipe,
    MatDivider,
    MatMenu,
    MatMenuItem,
    NgIf,
    MatMenuTrigger,
    DatePipe,
    RouterLink
  ],
  templateUrl: './user-task-details.component.html',
  styleUrl: './user-task-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTaskDetailsComponent {

  @Input() task!: UserTask;

  constructor(
		public taskManagerService: UserTaskManagerService
  ) {
  }


}
