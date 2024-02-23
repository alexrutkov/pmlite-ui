import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {ReasonDialogComponent} from "@components/reason.dialog/reason.dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MessageToastService} from "@services/message.service";
import {AgreementSummary} from "@modules/agreements/model/AgreementSummary";
import {EMPTY, filter, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormControl, Validators} from "@angular/forms";
import {MatBadge} from "@angular/material/badge";
import {Router} from "@angular/router";
import {DecisionType} from "@modules/decisions/model/DecisionSummary";
import {AsyncPipe, NgIf} from "@angular/common";
import {catchError, map} from "rxjs/operators";

@Component({
  selector: 'app-decision-actions',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatToolbar,
    MatIconButton,
    MatBadge,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './decision-actions.component.html',
  styleUrl: './decision-actions.component.scss'
})
export class DecisionActionsComponent implements OnInit {
  @Input() agreement!: AgreementSummary;
  @Output() resolved: EventEmitter<void> = new EventEmitter<void>();
  commentControl = new FormControl('', Validators.required);
  isDecideAllowed$: Observable<any> = EMPTY;

  constructor(
    private matDialog: MatDialog,
    private http: HttpClient,
    private messageService: MessageToastService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
       this.isDecideAllowed$ = this.http.get(`/api/agreements/${this.agreement.id}/decision`)
         .pipe(
           map(() => true),
           catchError(() => EMPTY)
         )
    }
  decline() {
    this.matDialog.open(ReasonDialogComponent)
      .afterClosed()
      .pipe(
        tap(reason => this.commentControl.setValue(reason)),
        filter(() => this.commentControl.valid)
      )
      .subscribe(() => this.saveDecision('DECLINE'));
  }

  approve() {
    this.messageService.confirm('Вы уверены, что хотите согласовать заявку?', `Деятель: ${this.agreement.user.name}.`)
      .pipe(filter(isConfirmed => isConfirmed))
      .subscribe(() => this.saveDecision('APPROVE'))
  }

  private saveDecision(decision: keyof typeof DecisionType) {
    this.http.post(`/api/agreements/${this.agreement.id}/decision`, {
      decision: decision,
      comment: this.commentControl.value
    }).subscribe(() => {
      this.messageService.success('Ваше решение было сохранено!');
      this.router.navigate(['agreements']).then();
    })
  }

  editComment() {
    this.matDialog.open(ReasonDialogComponent)
      .afterClosed()
      .subscribe(comment => {
        if (comment) this.commentControl.setValue(comment);
      });
  }
}
