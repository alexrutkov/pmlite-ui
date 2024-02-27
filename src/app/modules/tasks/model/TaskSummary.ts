import {Tag} from "@modules/tags/model/Tag";


export interface TaskSummary {
  id: number;
  name: string;
  shortDescription: string;
  createdAt: string;
  tags: Tag[];
}
