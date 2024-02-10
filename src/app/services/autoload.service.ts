import {Injectable} from "@angular/core";
import {AutoloadStore} from "@core/AutoloadStore";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {filter, takeUntil} from "rxjs";
import {AUTOLOAD_OFFSET} from "@core/consts";

@Injectable({
  providedIn: 'root'
})
export class AutoloadService {

  initAutoloadStore(
    virtualScroll: CdkVirtualScrollViewport,
    autoloadStore: AutoloadStore<any>) {
    virtualScroll.elementScrolled()
      .pipe(
        filter(() => this.isScrollOnBottom(virtualScroll)),
        takeUntil(autoloadStore.isDone$)
      )
      .subscribe(() => autoloadStore.tryLoadMore())
  }

  private isScrollOnBottom(virtualScroll: CdkVirtualScrollViewport): boolean {
    const offset = virtualScroll.measureScrollOffset('bottom')
    return offset < AUTOLOAD_OFFSET;
  }
}
