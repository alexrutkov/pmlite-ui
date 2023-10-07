import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ReasonDialogComponent} from "@components/reason.dialog/reason.dialog.component";
import {MessageToastService} from "@services/message.service";

@Component({
  selector: 'app-agreement-task',
  templateUrl: './agreement-task.component.html',
  styleUrls: ['./agreement-task.component.scss']
})
export class AgreementTaskComponent {

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
