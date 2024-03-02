import {LikeEntity} from "@core/LikeEntity";

export interface UserShortDetails extends LikeEntity {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}
