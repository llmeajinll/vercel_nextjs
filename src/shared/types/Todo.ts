export interface TodoType {
  _id: string;
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  tag: Array<Tag>;
  state: boolean;
}
export interface Tag {
  color: string;
  tag: string;
  _id: string;
}
