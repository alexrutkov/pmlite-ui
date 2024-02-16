import {NavigationEnd, Router} from "@angular/router";
import {Injectable, OnDestroy} from "@angular/core";
import {Subject, takeUntil} from "rxjs";

@Injectable()
export class TabRouterComponent implements OnDestroy {
  private selectedIndexTab = 0;
  private selectedRoute!: string | undefined;
  unsubscribe: Subject<void> = new Subject<void>();


  constructor(
    private router: Router
  ) {
    this.selectedRoute = this.router.url.split('/').pop();
    this.router.events
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.selectedRoute = e.urlAfterRedirects.split('/').pop();
        }
    })
  }

  isActive(route: string) {
    return this.selectedRoute == route;
  }

  indexFocus(index: number) {
    this.selectedIndexTab = index
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
