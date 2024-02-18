import {Component, OnInit} from '@angular/core';
import {filter} from "rxjs";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {TaskDetailsComponent} from "@modules/tasks/components/task-details/task-details.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-task-details.route',
  standalone: true,
  imports: [
    TaskDetailsComponent,
    NgIf
  ],
  template: '<app-task-details *ngIf="id" [taskId]="id"></app-task-details>'
})
export class TaskDetailsRouteComponent implements OnInit {
  id!: number;
  constructor(
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.route.params.pipe(
      filter(p => p['taskId']),
      map(p => p['taskId'] as number)
    ).subscribe(id => this.id = id);
  }
}
