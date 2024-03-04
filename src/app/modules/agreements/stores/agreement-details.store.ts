import {Injectable} from "@angular/core";
import {ComponentStore, OnStoreInit} from "@ngrx/component-store";
import {HttpClient} from "@angular/common/http";
import {WebsocketService} from "@services/websocket.service";
import {AgreementState} from "@modules/agreements/model/AgreementState";
import {PendingAgreementDetails} from "@modules/agreements/model/PendingAgreementDetails";
import {concatMap} from "rxjs/operators";
import {EMPTY, of, Subject, takeUntil} from "rxjs";
import {WebsocketEventType} from "@core/WebsocketEvent";
import {AgreementType} from "@modules/agreements/model/AgreementType";


@Injectable()
export class AgreementDetailsStore extends ComponentStore<AgreementState> implements OnStoreInit {
  unsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService
  ) {
    super();
    this.websocketService.watchEventsByType(WebsocketEventType.AGREEMENTS_UPDATED)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.ngrxOnStoreInit());
  }

  ngrxOnStoreInit(): void {
    this.http.get<PendingAgreementDetails>('/api/agreements/details')
      .subscribe(s => this.setState({details: s}));
  }

  totalAgreements = () => {
    return this.select(s => s.details.totalCount)
      .pipe(concatMap(total => total > 0 ? of(total) : EMPTY));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  countByTypes(...types: AgreementType[]) {
    return this.select(
      s =>
        s.details.agreementDetails
          .filter(p => types.find( t => t == p.type))
          .map(p => p.count)
          .reduceRight((prev, current) => prev + current, 0)
    )
  }
}
