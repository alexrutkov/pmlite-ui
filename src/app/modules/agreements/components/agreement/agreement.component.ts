import {Component, OnInit} from '@angular/core';
import {DecisionActionsComponent} from "@modules/agreements/components/decision-actions/decision-actions.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatToolbar} from "@angular/material/toolbar";
import {TeamDetailsComponent} from "@modules/teams/components/team-details/team-details.component";
import {UserDetailsComponent} from "@modules/users/components/user-details/user-details.component";
import {concatMap, EMPTY, Observable} from "rxjs";
import {AgreementSummary} from "@modules/agreements/model/AgreementSummary";
import {AsyncPipe, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {AgreementTaskComponent} from "@modules/agreements/components/agreement-task/agreement-task.component";

@Component({
  selector: 'app-agreement',
  standalone: true,
  imports: [
    DecisionActionsComponent,
    MatTab,
    MatTabGroup,
    MatToolbar,
    TeamDetailsComponent,
    UserDetailsComponent,
    AsyncPipe,
    NgIf,
    AgreementTaskComponent
  ],
  templateUrl: './agreement.component.html',
  styleUrl: './agreement.component.scss'
})
export class AgreementComponent implements OnInit{

  agreement$: Observable<AgreementSummary> = EMPTY;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.agreement$ = this.route.params.pipe(
      map(p => p['id']),
      concatMap(id => this.http.get<AgreementSummary>(`/api/agreements/${id}`))
    )
    }

}
