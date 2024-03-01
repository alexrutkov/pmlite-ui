import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EMPTY, Observable, tap} from "rxjs";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UserShortDetails} from "@modules/users/model/UserShortDetails";
import {provideComponentStore} from "@ngrx/component-store";
import {UsersStore} from "@modules/users/stores/users.store";

@Component({
  selector: 'app-employers',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [
    provideComponentStore(UsersStore)
  ]
})
export class UsersComponent implements OnInit, AfterViewInit {
  users$: Observable<UserShortDetails[]> = EMPTY;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  constructor(
    public usersStore: UsersStore
  ) {
    this.users$ = this.usersStore.select(s => s)
      .pipe(tap(() => setTimeout(() => this.virtualScroll?.checkViewportSize(), 500 )));
  }

  ngAfterViewInit(): void {
    this.usersStore.initAutoloadStore(this.virtualScroll);
  }


  ngOnInit(): void {
  }
}
