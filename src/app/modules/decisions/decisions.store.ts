import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AutoloadStore} from "@core/AutoloadStore";
import {AgreementType} from "@modules/agreements/model/AgreementType";
import {DecisionSummary} from "@modules/decisions/model/DecisionSummary";
import {DECISIONS_URL} from "@modules/decisions/tokens";


@Injectable()
export class DecisionsStore extends AutoloadStore<DecisionSummary> {
  constructor(
    http: HttpClient,
		@Inject(DECISIONS_URL) apiUrl: string
  ) {
    super(http, apiUrl);
  }

  setAgreementType(type: keyof typeof AgreementType) {
    this.httpParams = this.httpParams.set('type', type);
  }

}
