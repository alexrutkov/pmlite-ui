

export enum AgreementType {
  CREATE_TAG, CREATE_TASK, PARTICIPATE_TEAM,
  PARTICIPATE_TASK
}

export interface AgreementEvent<T> {
  id: string;
  type: keyof typeof AgreementType;
  data: T;
}
