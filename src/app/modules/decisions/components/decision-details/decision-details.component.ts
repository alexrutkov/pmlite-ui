import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DecisionSummary} from "@modules/decisions/model/DecisionSummary";
import {
  AgreementTagDetailsComponent
} from "@modules/agreements/components/agreement-tag-details/agreement-tag-details.component";
import {
  AgreementTaskDetailsComponent
} from "@modules/agreements/components/agreement-task-details/agreement-task-details.component";
import {
  AgreementTaskTeamsDetailsComponent
} from "@modules/agreements/components/agreement-task-teams-details/agreement-task-teams-details.component";
import {
  AgreementTaskUsersDetailsComponent
} from "@modules/agreements/components/agreement-task-users-details/agreement-task-users-details.component";
import {
  AgreementTeamUsersDetailsComponent
} from "@modules/agreements/components/agreement-team-users-details/agreement-team-users-details.component";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatChip} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {OverlayModule} from "@angular/cdk/overlay";
import {DefaultAvatarDirective} from "@directives/default-avatar.directive";

@Component({
  selector: 'app-decision-details',
  standalone: true,
  imports: [
    AgreementTagDetailsComponent,
    AgreementTaskDetailsComponent,
    AgreementTaskTeamsDetailsComponent,
    AgreementTaskUsersDetailsComponent,
    AgreementTeamUsersDetailsComponent,
    DatePipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    RouterLink,
    MatChip,
    NgIf,
    MatIcon,
    NgClass,
    MatTooltip,
    OverlayModule,
    DefaultAvatarDirective,
  ],
  templateUrl: './decision-details.component.html',
  styleUrl: './decision-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecisionDetailsComponent {
  isOpen: boolean = false;
  @Input() decision!: DecisionSummary;
}
