import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AutoloadStore} from "@core/AutoloadStore";
import {AgreementType} from "@modules/agreements/model/AgreementType";
import {DecisionSummary} from "@modules/decisions/model/DecisionSummary";


@Injectable()
export class DecisionsStore extends AutoloadStore<DecisionSummary> {
  constructor(
    http: HttpClient
  ) {
    super(http, '/api/decisions');
  }

  setAgreementType(type: keyof typeof AgreementType) {
    this.httpParams = this.httpParams.set('type', type);
  }

}
