
export enum WebsocketEventType {
  ROLES_UPDATED = "ROLES_UPDATED",
  TASK_CANCELLED = "TASK_CANCELLED",
  AGREEMENTS_UPDATED = "AGREEMENTS_UPDATED"
}

export interface WebsocketEvent {
  type: keyof typeof WebsocketEventType
}
