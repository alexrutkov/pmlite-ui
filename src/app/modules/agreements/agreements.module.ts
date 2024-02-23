import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from './components/main/main.component';
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {AgreementTeamComponent} from './components/agreement-team/agreement-team.component';
import {UserDetailsComponent} from "@modules/users/components/user-details/user-details.component";
import {TaskDetailsComponent} from "@modules/tasks/components/task-details/task-details.component";
import {TeamDetailsComponent} from "@modules/teams/components/team-details/team-details.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AgreementHistoryComponent} from './components/history/agreement-history.component';
import {
  AgreementShortDetailsComponent
} from "@modules/agreements/components/agreement-short-details/agreement-short-details.component";
import {AgreementTagComponent} from './components/agreement-tag/agreement-tag.component';
import {AgreementsComponent} from "@modules/agreements/components/agreements/agreements.component";
import {MatBadge} from "@angular/material/badge";
import {AGREEMENT_URL} from "@modules/agreements/tokens";
import {DecisionActionsComponent} from "@modules/decisions/components/decision-actions/decision-actions.component";
import {AgreementComponent} from "@modules/agreements/components/agreement/agreement.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'tags',
        component: AgreementsComponent,
        providers: [{provide: AGREEMENT_URL, useValue: '/api/agreements/tags'}]
      },
      {
        path: 'tasks',
        component: AgreementsComponent,
        providers: [{provide: AGREEMENT_URL, useValue: '/api/agreements/tasks'}]
      },
      {
        path: 'taskUsers',
        component: AgreementsComponent,
        providers: [{provide: AGREEMENT_URL, useValue: '/api/agreements/taskUsers'}]
      },
      {
        path: 'teams',
        component: AgreementsComponent,
        providers: [{provide: AGREEMENT_URL, useValue: '/api/agreements/teams'}]
      },
      {
        path: 'teamUsers',
        component: AgreementsComponent,
        providers: [{provide: AGREEMENT_URL, useValue: '/api/agreements/teamUsers'}]
      },
    ]
  },
  {path: 'history', component: AgreementHistoryComponent},
  {path: ':id', component: AgreementComponent}
];
@NgModule({
  declarations: [
    MainComponent,
    AgreementTeamComponent,
    AgreementHistoryComponent,
    AgreementTagComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    UserDetailsComponent,
    TaskDetailsComponent,
    TeamDetailsComponent,
    MatTabsModule,
    MatToolbarModule,
    AgreementShortDetailsComponent,
    MatBadge,
    DecisionActionsComponent
  ]
})
export class AgreementsModule { }
