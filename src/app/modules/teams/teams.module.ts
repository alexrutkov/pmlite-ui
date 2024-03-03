import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './components/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {TeamDetailsComponent} from "@modules/teams/components/team-details/team-details.component";
import {CreateTeamComponent} from "@modules/teams/components/create-team/create-team.component";
import {TeamsComponent} from "@modules/teams/components/teams/teams.component";
import {TEAMS_URL} from "@modules/teams/tokens";

const routes: Routes = [
  {
		path: '',
		component: MainComponent,
		children: [
			{path: '', redirectTo: 'all', pathMatch: 'full'},
			{
				path: 'all',
				component: TeamsComponent,
				providers: [{provide: TEAMS_URL, useValue: '/api/teams/all'}]
			},
			{
				path: 'my',
				component: TeamsComponent,
				providers: [{provide: TEAMS_URL, useValue: '/api/teams/my'}]
			},
		]},
	{path: 'create', component: CreateTeamComponent},
	{path: 'edit/:id', component: CreateTeamComponent},
	{path: ':id', component: TeamDetailsComponent},
];

@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        MatIconModule,

        CommonModule,
        RouterModule.forChild(routes),
        MatTabsModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
    ]
})
export class TeamsModule { }
