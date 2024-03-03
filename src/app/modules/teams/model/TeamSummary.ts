import {LikeEntity} from "@core/LikeEntity";


export interface TeamSummary extends LikeEntity {
	id: number;
	name: string;
	description: string;
	createdAt: string;
}
