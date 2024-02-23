import {Tag} from "@core/Tag";


export interface TaskSummary {
  id: number;
  name: string;
  shortDescription: string;
  createdAt: string;
  tags: Tag[];
}
