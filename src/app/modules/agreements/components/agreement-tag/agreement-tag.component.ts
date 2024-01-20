import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MessageToastService} from "@services/message.service";
import {ReasonDialogComponent} from "@components/reason.dialog/reason.dialog.component";

@Component({
  selector: 'app-agreement-tag',
  templateUrl: './agreement-tag.component.html',
  styleUrls: ['./agreement-tag.component.scss']
})
export class AgreementTagComponent {

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
