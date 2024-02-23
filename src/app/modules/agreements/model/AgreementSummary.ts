import {AgreementType} from "@modules/agreements/model/AgreementType";
import {UserSummary} from "@modules/users/model/UserSummary";

export interface AgreementSummary {
  createdAt: string;
  id: number;
  type: keyof typeof AgreementType;
  user: UserSummary;
  details: AgreementDetails;
  state: keyof typeof AgreementState;
}
export enum AgreementState {
  PENDING = "PENDING", APPROVED = "APPROVED", CANCELLED = "CANCELLED"
}

export interface AgreementTaskSummary {
  taskName: string;
  taskId: number;
}
export interface AgreementTagSummary {
  tag: string;
  tagId: number;
}

export interface AgreementTaskTeamSummary {
  taskName: string;
  taskId: number;
  teamName: string;
  teamId: number;
}

export interface AgreementTeamSummary {
  teamName: string;
  teamId: number;
}

export type AgreementDetails = AgreementTaskSummary
  | AgreementTagSummary
  | AgreementTaskTeamSummary
  | AgreementTeamSummary;
