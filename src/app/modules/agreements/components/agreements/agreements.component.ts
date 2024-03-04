import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {
	AgreementShortDetailsComponent
} from "@modules/agreements/components/agreement-short-details/agreement-short-details.component";
import {AgreementsStore} from "@modules/agreements/stores/agreements.store";
import {EMPTY, Observable, tap} from "rxjs";
import {AgreementSummary} from "@modules/agreements/model/AgreementSummary";
import {provideComponentStore} from "@ngrx/component-store";

@Component({
  selector: 'app-agreements',
  standalone: true,
  imports: [
    AsyncPipe,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    AgreementShortDetailsComponent
  ],
  templateUrl: './agreements.component.html',
  styleUrl: './agreements.component.scss',
  providers: [
    provideComponentStore(AgreementsStore)
  ]
})
export class AgreementsComponent implements AfterViewInit{
  agreements$: Observable<AgreementSummary[]> = EMPTY;

  @ViewChild(CdkVirtualScrollViewport) virtualScroll!: CdkVirtualScrollViewport;
  constructor(
    public agreementsStore: AgreementsStore
  ) {
    this.agreements$ = this.agreementsStore.select(s => s)
      .pipe(tap(() => this.virtualScroll?.ngOnInit()));
  }

  ngAfterViewInit(): void {
    this.agreementsStore.initAutoloadStore(this.virtualScroll);
  }
}
