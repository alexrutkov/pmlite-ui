
export enum WebsocketEventType {
  ROLES_UPDATED = "ROLES_UPDATED",
  AGREEMENT_CREATED = "AGREEMENT_CREATED"
}

export interface WebsocketEvent {
  type: keyof typeof WebsocketEventType
}
