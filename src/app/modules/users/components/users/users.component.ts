import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EMPTY, Observable, tap} from "rxjs";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UserShortDetails} from "@modules/users/model/UserShortDetails";
import {provideComponentStore} from "@ngrx/component-store";
import {UsersStore} from "@modules/users/stores/users.store";
import {FormControl} from "@angular/forms";

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
	searchControl = new FormControl('');
  constructor(
    public usersStore: UsersStore
  ) {
    this.users$ = this.usersStore.select(s => s)
      .pipe(tap(() => setTimeout(() => this.virtualScroll?.checkViewportSize(), 500 )));
		this.searchControl.valueChanges.subscribe(v => this.usersStore.setSearch(v))
  }

  ngAfterViewInit(): void {
    this.usersStore.initAutoloadStore(this.virtualScroll);
  }


  ngOnInit(): void {
  }
}
