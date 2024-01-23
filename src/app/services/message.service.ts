import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MessageToastService {

  constructor(
    private messageService: MessageService
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
}
