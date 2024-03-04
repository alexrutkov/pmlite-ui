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
import {AccountStore} from "@modules/account/account.store";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {concatMap, filter} from "rxjs";

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
    MatCardAvatar
  ],
  templateUrl: './task-user-details.component.html',
  styleUrl: './task-user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskUserDetailsComponent {

  @Input({required: true}) taskUser!: TaskUser;

  constructor(
    public accountStore: AccountStore,
    private messageService: MessageToastService,
    private http: HttpClient
  ) {
  }

  cancelUser(user: TaskUser) {
    this.messageService.confirm(
      `Вы уверены, что хотите выйти отклонить Деятеля?`,
      user.user.name
    ).pipe(
      filter(isConfirmed => isConfirmed),
      concatMap(() => this.http.delete(`/api/tasks/${user.taskId}/users/${user.user.id}`))
    ).subscribe(() => this.messageService.info('Деятель отклонен!'));
  }
}
