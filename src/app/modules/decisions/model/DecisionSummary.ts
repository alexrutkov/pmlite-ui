import {UserSummary} from "@modules/users/model/UserSummary";
import {AgreementSummary} from "@modules/agreements/model/AgreementSummary";

export enum DecisionType {
  DECLINE = "DECLINE", APPROVE = "APPROVE"
}

export enum DecisionMode {
  AUTO = "AUTO", MATUAL = "MATUAL"
}

export interface DecisionSummary {
  id: number;
  user: UserSummary;
  comment: string;
  createdAt: string;
  decision: keyof typeof DecisionType;
  mode: keyof typeof DecisionMode;
  agreement: AgreementSummary;
}
