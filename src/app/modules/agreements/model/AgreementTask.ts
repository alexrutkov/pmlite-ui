import {Employer} from "@modules/employers/Employer";


export enum AgreementTaskType {
  CREATE_TAG, CREATE_TASK, PARTICIPATE_TEAM,
  PARTICIPATE_TASK
}

export enum AgreementType {
  DECLINED, ACCEPTED
}

export interface AgreementTask<T> {
  id: string;
  type: keyof typeof AgreementTaskType;
  employer: Employer;
  data: T;
}

export interface Agreement<T> {
  id: string;
  type: keyof typeof AgreementType;
  agreementBy: Employer;
  agreementAt: string;
  task: AgreementTask<T>;
}
