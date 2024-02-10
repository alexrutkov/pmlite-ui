import {Component, Input} from '@angular/core';
import {UserSummary} from "@modules/users/model/UserSummary";
import {MatButton, MatIconButton} from "@angular/material/button";
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
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {ShortNumberPipe} from "@pipes/short-number.pipe";

@Component({
  selector: 'app-user-short-details',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatChip,
    MatChipSet,
    MatIcon,
    MatIconButton,
    RouterLink,
    TitleCasePipe,
    DatePipe,
    MatCardFooter,
    ShortNumberPipe
  ],
  templateUrl: './user-short-details.component.html',
  styleUrl: './user-short-details.component.scss'
})
export class UserShortDetailsComponent {
  @Input() user!: UserSummary;

}
