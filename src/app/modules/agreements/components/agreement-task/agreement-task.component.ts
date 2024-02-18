import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ReasonDialogComponent} from "@components/reason.dialog/reason.dialog.component";
import {MessageToastService} from "@services/message.service";
import {AgreementSummary, AgreementTaskSummary} from "@modules/agreements/model/AgreementSummary";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {UserDetailsComponent} from "@modules/users/components/user-details/user-details.component";
import {TaskDetailsComponent} from "@modules/tasks/components/task-details/task-details.component";

@Component({
  selector: 'app-agreement-task',
  standalone: true,
  templateUrl: './agreement-task.component.html',
  imports: [
    MatToolbarModule,
    MatTabsModule,
    UserDetailsComponent,
    TaskDetailsComponent
  ],
  styleUrls: ['./agreement-task.component.scss']
})
export class AgreementTaskComponent {

  details!: AgreementTaskSummary;
  private _agreementSummary!: AgreementSummary;
  @Input() set agreement(value: AgreementSummary) {
    this._agreementSummary = value;
    this.details = value.details as AgreementTaskSummary;
  }
  get agreement() {
    return this._agreementSummary;
  }
  constructor(
    private matDialog: MatDialog,
    private messageService: MessageToastService
  ) {
  }

  decline() {
    this.matDialog.open(ReasonDialogComponent)
      .afterClosed()
      .subscribe(reason => {
        if (reason) this.messageService.success(`Запрос отклонен по причине: ${reason}`);
      });
  }
}
