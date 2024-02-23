import {filter, Subject, takeUntil} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {Injectable, TrackByFunction} from "@angular/core";
import {Id} from "@core/Id";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {AUTOLOAD_OFFSET} from "@core/consts";

@Injectable()
export abstract class AutoloadStore<T extends Id> extends ComponentStore<T[]> implements OnStoreInit {
  private isLoading = false;
  protected unsubscribe: Subject<void> = new Subject<void>();

  private page = -1;
  private pageSize = 25;
  protected httpParams = new HttpParams().set('size', this.pageSize);

  private isDone = new Subject<void>();
  public isDone$ = this.isDone.asObservable();



  protected constructor(
    private http: HttpClient,
    private apiUrl: string | undefined = undefined,
  ) {
    super([]);
  }

  ngrxOnStoreInit() {
    this.page = -1;
    this.setState([]);
    this.tryLoadMore();
  }

  saveToStore: (content: T[]) => void = this.updater(
    (state, users: T[]): T[] => {
      return [...state, ...users];
    });

  setApiUrl(url: string) {
    this.apiUrl = url;
    this.ngrxOnStoreInit();
  }

  private isLastPage(content: T[]) {
    if (content.length < this.pageSize) {
      this.isDone.next();
      this.isDone.complete();
    }
  }

  tryLoadMore() {
    if (!this.isLoading && this.apiUrl) {
      this.isLoading = true;

      this.http.get<T[]>(this.apiUrl, {params: this.httpParams.set('page', ++this.page)})
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

  initAutoloadStore(
    virtualScroll: CdkVirtualScrollViewport) {
    virtualScroll.elementScrolled()
      .pipe(
        filter(() => this.isScrollOnBottom(virtualScroll)),
        takeUntil(this.isDone$)
      )
      .subscribe(() => this.tryLoadMore())
  }

  private isScrollOnBottom(virtualScroll: CdkVirtualScrollViewport): boolean {
    const offset = virtualScroll.measureScrollOffset('bottom')
    return offset < AUTOLOAD_OFFSET;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
