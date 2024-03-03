import {LikeEntity} from "@core/LikeEntity";
import {Tag} from "@modules/tags/model/Tag";

export interface UserShortDetails extends LikeEntity {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface UserDetails {
	details: UserShortDetails;
	tags: Tag[];
}
