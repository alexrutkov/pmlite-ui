import {Injectable} from "@angular/core";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {HttpClient} from "@angular/common/http";
import {Tag} from "../model/Tag";
import {tap} from "rxjs";


@Injectable()
export class TagsStore extends ComponentStore<Tag[]> implements OnStoreInit {

  constructor(
    private http: HttpClient
  ) {
    super([]);
  }

  ngrxOnStoreInit(): void {
    this.http.get<Tag[]>('/api/account/tags')
      .subscribe(s => this.setState(s));
  }

  addTags(tags: Tag[]) {
    return this.http.post('/api/account/tags', tags)
      .pipe(tap(() => this.ngrxOnStoreInit()))
  }
}
