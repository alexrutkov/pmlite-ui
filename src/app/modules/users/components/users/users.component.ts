import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EMPTY, Observable, tap} from "rxjs";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UserSummary} from "@modules/users/model/UserSummary";
import {UsersStore} from "@modules/users/users.store";
import {provideComponentStore} from "@ngrx/component-store";

@Component({
  selector: 'app-employers',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [
    provideComponentStore(UsersStore)
  ]
})
export class UsersComponent implements OnInit, AfterViewInit {
  users$: Observable<UserSummary[]> = EMPTY;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  constructor(
    public usersStore: UsersStore
  ) {
    this.users$ = this.usersStore.select(s => s)
      .pipe(tap(() => this.virtualScroll?.ngOnInit()));
  }

  ngAfterViewInit(): void {
    this.usersStore.initAutoloadStore(this.virtualScroll);
  }


  ngOnInit(): void {
  }
}
