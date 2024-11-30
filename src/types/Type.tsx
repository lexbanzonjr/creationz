import { Option } from "./Option";

export interface Type {
  _id: string;
  name: string;
  options: Option[];
}
