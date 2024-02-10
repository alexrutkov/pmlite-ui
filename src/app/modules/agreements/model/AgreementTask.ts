import {User} from "@modules/users/model/User";


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
  employer: User;
  data: T;
}

export interface Agreement<T> {
  id: string;
  type: keyof typeof AgreementType;
  agreementBy: User;
  agreementAt: string;
  task: AgreementTask<T>;
}
