import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TasksStore} from "@modules/tasks/stores/tasks.store";
import {EMPTY, Observable, tap} from "rxjs";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {provideComponentStore} from "@ngrx/component-store";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [
    provideComponentStore(TasksStore)
  ]
})
export class TasksComponent implements AfterViewInit {

  tasks$: Observable<TaskSummary[]> = EMPTY;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

	searchControl = new FormControl('');

  constructor(
    public tasksStore: TasksStore
  ) {
    this.tasks$ = this.tasksStore.select(s => s)
      .pipe(tap(() => this.virtualScroll?.ngOnInit()));
		this.searchControl.valueChanges.subscribe(v => {
			console.log(v);
			this.tasksStore.setSearch(v);
		})
  }

  ngAfterViewInit(): void {
    this.tasksStore.initAutoloadStore(this.virtualScroll);
  }


  ngOnInit(): void {
  }

}
