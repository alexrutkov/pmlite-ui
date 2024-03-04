import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AutoloadStore} from "@core/AutoloadStore";
import {AgreementSummary} from "@modules/agreements/model/AgreementSummary";
import {AGREEMENT_URL} from "@modules/agreements/tokens";


@Injectable()
export class AgreementsStore extends AutoloadStore<AgreementSummary> {
  constructor(
    http: HttpClient,
    @Inject(AGREEMENT_URL) apiUrl: string
  ) {
    super(http, apiUrl);
  }

}
