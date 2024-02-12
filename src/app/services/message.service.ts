import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "@components/confirm.dialog/confirm.dialog.component";
import {ConfirmMessage} from "@core/ConfirmMessage";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageToastService {

  constructor(
    private messageService: MessageService,
    private matDialog: MatDialog
  ) { }

  success(message: string) {
    this.messageService.add({severity:'success', summary: message});
  }

  error(message: string) {
    this.messageService.add({severity:'error', summary: message});
  }

  info(message: string) {
    this.messageService.add({severity: 'info', summary: message});
  }

  confirm(message: string, hint: string | undefined = undefined): Observable<boolean> {
    const confirmMessage: ConfirmMessage = {message: message, hint: hint};
    return this.matDialog.open(ConfirmDialogComponent, {data: confirmMessage})
      .afterClosed()
  }
}
