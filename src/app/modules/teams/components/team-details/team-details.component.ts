import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";
import {RouterLink} from "@angular/router";
import {EMPTY, Observable} from "rxjs";
import {
	MatAccordion,
	MatExpansionPanel,
	MatExpansionPanelContent,
	MatExpansionPanelHeader,
	MatExpansionPanelTitle
} from "@angular/material/expansion";
import {TagsComponent} from "@modules/tags/components/tags/tags.component";
import {TaskMenuComponent} from "@modules/tasks/components/task-menu/task-menu.component";
import {TaskUsersComponent} from "@modules/tasks/components/task-users/task-users.component";
import {HttpClient} from "@angular/common/http";
import {TeamDetails} from "@modules/teams/model/TeamDetails";
import {TeamMenuComponent} from "@modules/teams/components/team-menu/team-menu.component";
import {TeamUsersComponent} from "@modules/teams/components/team-users/team-users.component";
import {TeamTasksComponent} from "@modules/teams/components/team-tasks/team-tasks.component";

@Component({
  selector: 'app-team-details',
  standalone: true,
	imports: [CommonModule, MatChipsModule, NgOptimizedImage, RouterLink, MatAccordion, MatExpansionPanel, MatExpansionPanelContent, MatExpansionPanelHeader, MatExpansionPanelTitle, TagsComponent, TaskMenuComponent, TaskUsersComponent, TeamMenuComponent, TeamUsersComponent, TeamTasksComponent],
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent {

	team$: Observable<TeamDetails> = EMPTY;

	@Input({required: true}) set teamId(id: number) {
		this.team$ = this.http.get<TeamDetails>(`/api/teams/${id}`);
	}
	constructor(
		private http: HttpClient
	) {
	}
}
