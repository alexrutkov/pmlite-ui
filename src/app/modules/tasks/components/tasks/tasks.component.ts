import {Component, OnInit} from '@angular/core';
import {TasksStore} from "@stores/tasks.store";
import {EMPTY, Observable} from "rxjs";
import {Task} from "@modules/tasks/model/Task";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$: Observable<Task[]> = EMPTY;
  constructor(
    private tasksStore: TasksStore,
    private http: HttpClient
  ) {
    this.tasks$ = this.tasksStore.select(s => s.tasks);
  }

  ngOnInit(): void {
/*    this.http.post('/api/tasks', {name: 'Простое имя', shortDescription: 'Короткое описание'})
      .subscribe()*/
  }

}
