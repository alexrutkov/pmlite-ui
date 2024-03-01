import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {USERS_URL} from "@modules/users/tokens";
import {UserShortDetails} from "@modules/users/model/UserShortDetails";
import {AutoloadStore} from "@core/AutoloadStore";
import {takeUntil} from "rxjs";
import {TagsStore} from "@modules/tags/stores/tags.store";


@Injectable()
export class UsersStore extends AutoloadStore<UserShortDetails>  {



  constructor(
    http: HttpClient,
    @Inject(USERS_URL) apiUrl: string,
		tagsStore: TagsStore
  ) {
    super(http, apiUrl);
		tagsStore.state$
			.pipe(
				takeUntil(this.unsubscribe)
			)
			.subscribe(() => this.ngrxOnStoreInit());
  }


}
