import {Inject, Injectable} from "@angular/core";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {HttpClient} from "@angular/common/http";
import {TASKS_URL} from "@modules/tasks/tokens";
import {AutoloadStore} from "@core/AutoloadStore";
import {TagsStore} from "@modules/tags/stores/tags.store";
import {takeUntil} from "rxjs";


@Injectable()
export class TasksStore extends AutoloadStore<TaskSummary> {
  constructor(
    http: HttpClient,
    @Inject(TASKS_URL) apiUrl: string,
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
