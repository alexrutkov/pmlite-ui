import {AgreementType} from "@modules/agreements/model/AgreementType";

export interface PendingAgreementDetails {
  agreementDetails: PendingAgreementCount[];
  totalCount: number;
}

export interface PendingAgreementCount {
  type: keyof typeof AgreementType;
  count: number;
}
