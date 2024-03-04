import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TaskUser} from "@modules/tasks/model/TaskUser";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
	MatCard,
	MatCardActions,
	MatCardAvatar,
	MatCardFooter,
	MatCardHeader,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {TaskUserManagerService} from "@modules/tasks/services/task-user-manager.service";
import {AvatarComponent} from "@components/avatar/avatar.component";

@Component({
  selector: 'app-task-user-details',
  standalone: true,
	imports: [
		AsyncPipe,
		DatePipe,
		MatButton,
		MatCard,
		MatCardActions,
		MatCardFooter,
		MatCardHeader,
		MatCardSubtitle,
		MatCardTitle,
		MatIcon,
		MatIconButton,
		MatMenu,
		MatMenuItem,
		NgIf,
		RouterLink,
		MatMenuTrigger,
		MatCardAvatar,
		AvatarComponent
	],
  templateUrl: './task-user-details.component.html',
  styleUrl: './task-user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskUserDetailsComponent {

  @Input({required: true}) taskUser!: TaskUser;

  constructor(
    public manager: TaskUserManagerService
  ) {
  }


}
