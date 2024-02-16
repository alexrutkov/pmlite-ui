import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {USERS_URL} from "@modules/users/tokens";
import {UserShortDetails} from "@modules/users/model/UserShortDetails";
import {AutoloadStore} from "@core/AutoloadStore";


@Injectable()
export class UsersStore extends AutoloadStore<UserShortDetails>  {



  constructor(
    http: HttpClient,
    @Inject(USERS_URL) apiUrl: string
  ) {
    super(http, apiUrl);
  }


}
