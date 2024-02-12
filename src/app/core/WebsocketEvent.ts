
export enum WebsocketEventType {
  ROLES_UPDATED = "ROLES_UPDATED",
  TASK_CANCELLED = "TASK_CANCELLED",
  AGREEMENT_CREATED = "AGREEMENT_CREATED"
}

export interface WebsocketEvent {
  type: keyof typeof WebsocketEventType
}
