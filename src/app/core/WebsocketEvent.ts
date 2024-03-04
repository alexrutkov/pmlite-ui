
export enum WebsocketEventType {
  ROLES_UPDATED = "ROLES_UPDATED",
  TASK_UPDATED = "TASK_UPDATED",
  TEAM_UPDATED = "TEAM_UPDATED",
  AGREEMENTS_UPDATED = "AGREEMENTS_UPDATED"
}

export interface WebsocketEvent {
  type: keyof typeof WebsocketEventType
}
