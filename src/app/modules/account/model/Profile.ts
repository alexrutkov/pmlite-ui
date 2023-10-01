export interface Profile {
  name: string;
  username: string;
  about: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
}
