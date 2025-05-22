export interface TagType {
  color: string;
  tag: string;
  _id: string;
}

export interface TodoType {
  _id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  tag: Array<TagType>;
  state: boolean;
}

export interface WeatherObjectType {
  baseDate: string
  baseTime: string
  category: string
  nx: number
  ny: number
  obsrValue: string
}

export interface WeatherType {
    item: Array<WeatherObjectType>
}