import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {AgreementSummary} from "@modules/agreements/model/AgreementSummary";
import {
  AgreementTaskDetailsComponent
} from "@modules/agreements/components/agreement-task-details/agreement-task-details.component";
import {
  AgreementTaskUsersDetailsComponent
} from "@modules/agreements/components/agreement-task-users-details/agreement-task-users-details.component";
import {
  AgreementTaskTeamsDetailsComponent
} from "@modules/agreements/components/agreement-task-teams-details/agreement-task-teams-details.component";
import {
  AgreementTagDetailsComponent
} from "@modules/agreements/components/agreement-tag-details/agreement-tag-details.component";
import {
  AgreementTeamUsersDetailsComponent
} from "@modules/agreements/components/agreement-team-users-details/agreement-team-users-details.component";

@Component({
  selector: 'app-agreement-short-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatChipsModule, RouterLink, MatIconModule, AgreementTaskDetailsComponent, AgreementTaskUsersDetailsComponent, AgreementTaskTeamsDetailsComponent, AgreementTagDetailsComponent, AgreementTeamUsersDetailsComponent],
  templateUrl: './agreement-short-details.component.html',
  styleUrls: ['./agreement-short-details.component.scss']
})
export class AgreementShortDetailsComponent {
  @Input() agreement!: AgreementSummary;
}
