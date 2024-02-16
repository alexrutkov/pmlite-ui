import {Component, Input, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {HttpClient} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {AccountStore} from "@modules/account/account.store";
import {concatMap, EMPTY, filter, map, Observable} from "rxjs";
import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";
import {AsyncPipe, NgIf} from "@angular/common";
import {MessageToastService} from "@services/message.service";

@Component({
  selector: 'app-task-menu',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMiniFabButton,
    MatMenuModule,
    RouterLink,
    MatDivider,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss'
})
export class TaskMenuComponent implements OnInit {

  @Input() taskId!: number;

  enableEditTask$: Observable<boolean> = EMPTY;
  enableTaskJoin$: Observable<boolean> = EMPTY;


  constructor(
    private http: HttpClient,
    private messageService: MessageToastService,
    public accountStore: AccountStore
  ) {

  }

  private update() {

  }

  ngOnInit(): void {
    this.enableEditTask$ = this.accountStore.hasTaskRole(this.taskId, UserTaskRole.OWNER);
    this.enableTaskJoin$ = this.accountStore.hasTask(this.taskId).pipe(map(isEnable => !isEnable));
  }

  joinToTask() {
    this.messageService.confirm(
      'Вы уверены, что хотите присоединиться к выполнению данной задаче?',
      'Будет создана заявка, ожидайте согласования'
    ).pipe(
      filter(isConfirmed => isConfirmed),
      concatMap(() => this.http.post(`/api/tasks/${this.taskId}/join`, null))
    ).subscribe(() => this.messageService.success('Заявка создана!'))
  }
}
