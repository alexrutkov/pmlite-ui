import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter} from "rxjs";
import {map} from "rxjs/operators";
import {UserDetailsComponent} from "@modules/users/components/user-details/user-details.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-details.route',
  standalone: true,
  imports: [
    UserDetailsComponent,
    NgIf
  ],
  template: '<app-user-details *ngIf="id" [userId]="id"></app-user-details>',
  styleUrl: './user-details.route.component.scss'
})
export class UserDetailsRouteComponent implements OnInit {

  id!: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(
      filter(p => p['userId']),
      map(p => p['userId'] as number)
    ).subscribe(id => this.id = id);
  }
}
