export interface TodoType {
  _id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  tag: Array<TagType>;
  state: boolean;
}

export interface TagType {
  color: string;
  tag: string;
  _id: string;
}
