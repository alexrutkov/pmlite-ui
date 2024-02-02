import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {MessageToastService} from "@services/message.service";
import {catchError} from "rxjs/operators";


export interface ValidationError {
  defaultMessage: string;
  objectName: string;
  field: string;
  rejectedValue?: any;
  code: string;
}


@Injectable()
export class HandlerInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageToastService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {

        this.showValidationErrors(err);

        return throwError(() => err);
      })
    )
    }

  private showValidationErrors(err: HttpErrorResponse) {
    if (this.isValidationError(err)) {
      (err.error.errors as ValidationError[]).forEach(error => {
        this.messageService.error(`Поле ${error.field}: ${error.defaultMessage} (${error.code})`)
      })
    }
  }

  private isValidationError(err: HttpErrorResponse) {
    return err.status === 400 && err.error.errors;
  }
}
