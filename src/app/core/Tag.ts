import {AgreementState} from "@modules/agreements/model/AgreementSummary";

export interface Tag {
  tag: string;
  tagId: number;
  displayTag: string;
  state: keyof typeof AgreementState;
}
