import {Tag} from "@modules/tags/model/Tag";

export interface Profile {
  name: string;
  description: string;
  tags: Tag[];
}

