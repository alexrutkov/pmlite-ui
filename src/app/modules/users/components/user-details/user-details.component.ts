import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {
  AgreementShortDetailsComponent
} from "@modules/agreements/components/agreement-short-details/agreement-short-details.component";
import {Agreement} from "@modules/agreements/model/AgreementTask";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {concatMap, EMPTY, Observable} from "rxjs";
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

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatChipsModule, RouterLink, AgreementShortDetailsComponent, MatExpansionModule, MatButton, MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle, MatIcon, ShortNumberPipe, MatIconButton, UserTasksComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<UserShortDetails> = EMPTY;

  events: Agreement<any>[] = [];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(
      map(p => p['id'] as string),
      concatMap(id => this.http.get<UserShortDetails>(`/api/users/${id}`))
    );
  }
}
