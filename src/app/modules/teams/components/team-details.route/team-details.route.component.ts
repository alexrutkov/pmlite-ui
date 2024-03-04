import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter} from "rxjs";
import {map} from "rxjs/operators";
import {TeamDetailsComponent} from "@modules/teams/components/team-details/team-details.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-team-details.route',
  standalone: true,
  imports: [
		TeamDetailsComponent,
		NgIf
	],
	template: '<app-team-details *ngIf="id" [teamId]="id"></app-team-details>'
})
export class TeamDetailsRouteComponent implements OnInit  {
	id!: number;
	constructor(
		private route: ActivatedRoute
	) {
	}
	ngOnInit(): void {
		this.route.params.pipe(
			filter(p => p['teamId']),
			map(p => p['teamId'] as number)
		).subscribe(id => this.id = id);
	}
}
