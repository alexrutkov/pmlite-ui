import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";
import {RouterLink} from "@angular/router";
import {
  AgreementShortDetailsComponent
} from "@modules/agreements/components/agreement-short-details/agreement-short-details.component";
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {UserShortDetails} from "@modules/users/model/UserShortDetails";
import {MatExpansionModule} from "@angular/material/expansion";
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
import {MatIcon} from "@angular/material/icon";
import {ShortNumberPipe} from "@pipes/short-number.pipe";
import {UserTasksComponent} from "@modules/users/components/user-tasks/user-tasks.component";
import {DefaultAvatarDirective} from "@directives/default-avatar.directive";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatChipsModule, RouterLink, AgreementShortDetailsComponent, MatExpansionModule, MatButton, MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle, MatIcon, ShortNumberPipe, MatIconButton, UserTasksComponent, DefaultAvatarDirective],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  user$: Observable<UserShortDetails> = EMPTY;

  @Input() set userId(id: number) {
    this.user$ = this.http.get<UserShortDetails>(`/api/users/${id}`);
  }

  constructor(
    private http: HttpClient
  ) {
  }
}
