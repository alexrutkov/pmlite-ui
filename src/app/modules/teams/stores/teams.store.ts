import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AutoloadStore} from "@core/AutoloadStore";
import {TagsStore} from "@modules/tags/stores/tags.store";
import {takeUntil} from "rxjs";
import {TeamSummary} from "@modules/teams/model/TeamSummary";
import {TEAMS_URL} from "@modules/teams/tokens";


@Injectable()
export class TeamsStore extends AutoloadStore<TeamSummary> {
  constructor(
    http: HttpClient,
    @Inject(TEAMS_URL) apiUrl: string,
		tagsStore: TagsStore
  ) {
    super(http, apiUrl);
		tagsStore.state$
			.pipe(
				takeUntil(this.unsubscribe)
			)
			.subscribe(() => this.ngrxOnStoreInit());
  }

	setSearch(search: string | null) {
		if (search) {
			this.httpParams = this.httpParams.set('search', search);
			this.ngrxOnStoreInit();
		} else if (this.httpParams.keys().includes('search')) {
			this.httpParams = this.httpParams.delete('search');
			this.ngrxOnStoreInit();
		}
	}
}
