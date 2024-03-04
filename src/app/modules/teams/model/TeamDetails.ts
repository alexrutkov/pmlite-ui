import {TeamSummary} from "@modules/teams/model/TeamSummary";
import {Tag} from "@modules/tags/model/Tag";

export interface TeamDetails {
	summary: TeamSummary;
	tags: Tag[];
}
