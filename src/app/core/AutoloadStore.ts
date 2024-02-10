import {Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {TrackByFunction} from "@angular/core";
import {Id} from "@core/Id";

export abstract class AutoloadStore<T extends Id> extends ComponentStore<T[]> implements OnStoreInit {
  private isLoading = false;
  private page = 0;
  private pageSize = 25;
  private sizeParam = new HttpParams().set('size', this.pageSize);

  private isDone = new Subject<void>();
  public isDone$ = this.isDone.asObservable();



  protected constructor(
    private http: HttpClient,
    private apiUrl: string,
  ) {
    super([]);
  }

  ngrxOnStoreInit() {
    this.http.get<T[]>(this.apiUrl, {params: this.sizeParam})
      .subscribe(content => this.saveToStore(content));
  }

  saveToStore: (content: T[]) => void = this.updater(
    (state, users: T[]): T[] => {
      return [...state, ...users];
    });

  private isLastPage(content: T[]) {
    if (content.length < this.pageSize) {
      this.isDone.next();
      this.isDone.complete();
    }
  }

  tryLoadMore() {
    if (!this.isLoading) {
      this.isLoading = true;

      this.http.get<T[]>(this.apiUrl, {params: this.sizeParam.set('page', ++this.page)})
        .subscribe(content => {
          this.saveToStore(content);
          this.isLastPage(content);
          setTimeout(() => this.isLoading = false, 500);
        });
    }
  }

  trackIdFn: TrackByFunction<T> = (index: number, task: T) => {
    return task.id
  }
}
