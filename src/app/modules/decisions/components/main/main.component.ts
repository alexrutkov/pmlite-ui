import {Component, ViewChild} from '@angular/core';
import {tap} from "rxjs";
import {
  AgreementShortDetailsComponent
} from "@modules/agreements/components/agreement-short-details/agreement-short-details.component";
import {AsyncPipe} from "@angular/common";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {DecisionsStore} from "@modules/decisions/decisions.store";
import {DecisionDetailsComponent} from "@modules/decisions/components/decision-details/decision-details.component";
import {CdkAutoSizeVirtualScroll} from "@angular/cdk-experimental/scrolling";
import {provideComponentStore} from "@ngrx/component-store";

@Component({
  selector: 'app-decisions-main',
  standalone: true,
  imports: [
    AgreementShortDetailsComponent,
    AsyncPipe,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    DecisionDetailsComponent,
    CdkAutoSizeVirtualScroll,
    CdkFixedSizeVirtualScroll
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers: [
    provideComponentStore(DecisionsStore)
  ]
})
export class MainComponent {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;

  protected readonly decisions$ = this.decisionStore.select(s => s)
    .pipe(tap(() => this.virtualScroll?.ngOnInit()))

  constructor(
    public decisionStore: DecisionsStore
  ) {
  }
}
