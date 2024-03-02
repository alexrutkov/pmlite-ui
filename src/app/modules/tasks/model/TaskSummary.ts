import {Tag} from "@modules/tags/model/Tag";
import {LikeEntity} from "@core/LikeEntity";


export interface TaskSummary extends LikeEntity {
  id: number;
  name: string;
  shortDescription: string;
  createdAt: string;
  tags: Tag[];
}
