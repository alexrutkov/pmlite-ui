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
import {AgreementTaskComponent} from './components/agreement-task/agreement-task.component';
import {AgreementTeamComponent} from './components/agreement-team/agreement-team.component';
import {EmployeeDetailsComponent} from "@components/employee-details/employee-details.component";
import {TaskDetailsComponent} from "@components/task-details/task-details.component";
import {TeamDetailsComponent} from "@components/team-details/team-details.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: ':id/task', component: AgreementTaskComponent},
  {path: ':id/team', component: AgreementTeamComponent}
];
@NgModule({
  declarations: [
    MainComponent,
    AgreementTaskComponent,
    AgreementTeamComponent
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
    EmployeeDetailsComponent,
    TaskDetailsComponent,
    TeamDetailsComponent,
    MatTabsModule,
    MatToolbarModule
  ]
})
export class AgreementsModule { }
