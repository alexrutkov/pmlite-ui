import {UserTeamRole} from "@modules/teams/model/UserTeamRole";

export interface UserTeam {
  id: number;
  userId: number;
  teamId: number;
  name: string;
  createdAt: string;
  role: keyof typeof UserTeamRole;
}
