import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
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
import {AsyncPipe, NgIf, TitleCasePipe} from "@angular/common";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UserTaskDetailsComponent} from "@modules/users/components/user-task-details/user-task-details.component";
import {EMPTY, Observable, tap} from "rxjs";
import {UserTasksStore} from "@modules/users/user-tasks.store";
import {UserTask} from "@modules/users/model/UserTask";
import {provideComponentStore} from "@ngrx/component-store";
import {UserShortDetailsComponent} from "@modules/users/components/user-short-details/user-short-details.component";

@Component({
  selector: 'app-user-tasks',
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
    TitleCasePipe,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    UserTaskDetailsComponent,
    AsyncPipe,
    CdkVirtualForOf,
    UserShortDetailsComponent,
    NgIf
  ],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.scss',
  providers: [
    provideComponentStore(UserTasksStore)
  ]
})
export class UserTasksComponent implements AfterViewInit {

  @Input()
  set userId(id: number) {
    this.userTasksStore.updateApiUrl(`/api/users/${id}/tasks`);
  }

  task$: Observable<UserTask[]> = EMPTY;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  constructor(
    public userTasksStore: UserTasksStore
  ) {
    this.task$ = this.userTasksStore.select(s => s)
      .pipe(tap(() => this.virtualScroll?.ngOnInit()));
  }

  ngAfterViewInit(): void {
    this.userTasksStore.initAutoloadStore(this.virtualScroll);
  }
}
