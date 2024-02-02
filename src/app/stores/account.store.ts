import {Injectable} from "@angular/core";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {HttpClient} from "@angular/common/http";
import {AccountState} from "@modules/account/model/AccountState";
import {AccountDetails} from "@modules/account/model/AccountDetails";
import {UserRole} from "@modules/account/model/AccountRole";


@Injectable()
export class AccountStore extends ComponentStore<AccountState> implements OnStoreInit {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  ngrxOnStoreInit(): void {
    this.http.get<AccountDetails>('/api/account/details')
      .subscribe(s => this.setState({details: s}));
  }

  hasRole(role: UserRole) {
    return this.select((state: AccountState) => state.details.roles.includes(role))
  }


}
