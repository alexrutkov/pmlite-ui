import {UserSummary} from "@modules/users/model/UserSummary";
import {UserTeamRole} from "@modules/teams/model/UserTeamRole";


export interface TeamUser {
	id: number;
	teamId: number;
	user: UserSummary;
	createdAt: string;
	role: keyof typeof UserTeamRole;
}
