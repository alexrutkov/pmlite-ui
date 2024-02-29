import {Tag} from "@modules/tags/model/Tag";

export enum ActivityState {
	ACTIVE, IN_ACTIVE, CANCELLED
}

export interface AccountTag {
	id: number,
	tag: Tag,
	state: keyof typeof ActivityState,
	createdAt: string
}
