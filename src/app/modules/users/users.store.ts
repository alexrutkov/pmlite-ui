import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {USERS_URL} from "@modules/users/tokens";
import {UserSummary} from "@modules/users/model/UserSummary";
import {AutoloadStore} from "@core/AutoloadStore";


@Injectable()
export class UsersStore extends AutoloadStore<UserSummary>  {



  constructor(
    http: HttpClient,
    @Inject(USERS_URL) apiUrl: string
  ) {
    super(http, apiUrl);
  }


}
