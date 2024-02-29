import {Injectable} from "@angular/core";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {HttpClient} from "@angular/common/http";
import {Tag} from "../model/Tag";
import {tap} from "rxjs";
import {AccountTag} from "@modules/tags/model/AccountTag";


@Injectable()
export class TagsStore extends ComponentStore<AccountTag[]> implements OnStoreInit {

  constructor(
    private http: HttpClient
  ) {
    super([]);
  }

  ngrxOnStoreInit(): void {
    this.http.get<AccountTag[]>('/api/account/tags')
      .subscribe(s => this.setState(s));
  }

  addTags(tags: Tag[]) {
    return this.http.post('/api/account/tags', tags)
      .pipe(tap(() => this.ngrxOnStoreInit()))
  }

	toggleTagState(tag: AccountTag, isActive: boolean) {
		this.http.patch(`/api/account/tags/${tag.id}`, {isActive})
			.subscribe(() => this.ngrxOnStoreInit());
	}

	deleteTag(tag: AccountTag) {
		this.http.delete(`/api/account/tags/${tag.id}`)
			.subscribe(() => this.ngrxOnStoreInit());
	}
}
