import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";
import {AccountState, initialAccountState} from "@modules/account/model/AccountState";


@Injectable()
export class AccountStore extends ComponentStore<AccountState>  {

  constructor(
    private http: HttpClient,
    private messageService: MessageToastService
  ) {
    super(initialAccountState);
  }

/*  readonly saveTask = this.effect((task$: Observable<Task>) => {
    return task$.pipe(
      tap(task => {
        this.taskStorage.saveTask()
      })
    )
  })*/


}
