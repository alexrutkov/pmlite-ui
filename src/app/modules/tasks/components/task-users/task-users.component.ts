import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UserTaskDetailsComponent} from "@modules/users/components/user-task-details/user-task-details.component";
import {provideComponentStore} from "@ngrx/component-store";
import {TaskUsersStore} from "@modules/tasks/stores/task-users.store";
import {EMPTY, Observable, tap} from "rxjs";
import {TaskUser} from "@modules/tasks/model/TaskUser";
import {TaskUserDetailsComponent} from "@modules/tasks/components/task-user-details/task-user-details.component";

@Component({
  selector: 'app-task-users',
  standalone: true,
  imports: [
    AsyncPipe,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    NgIf,
    UserTaskDetailsComponent,
    TaskUserDetailsComponent
  ],
  templateUrl: './task-users.component.html',
  styleUrl: './task-users.component.scss',
  providers: [
    provideComponentStore(TaskUsersStore)
  ]
})
export class TaskUsersComponent implements AfterViewInit {

  @Input() set taskId(id: number) {
    this.taskUsersStore.setApiUrl(`/api/tasks/${id}/users`);
  }


  users$: Observable<TaskUser[]> = EMPTY;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  constructor(
    public taskUsersStore: TaskUsersStore
  ) {
    this.users$ = this.taskUsersStore.select(s => s)
      .pipe(tap(() => this.virtualScroll?.ngOnInit()));
  }

  ngAfterViewInit(): void {
    this.taskUsersStore.initAutoloadStore(this.virtualScroll);
  }

}
