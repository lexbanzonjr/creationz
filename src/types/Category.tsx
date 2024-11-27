import { Design } from "./Design";

export interface Category {
  _id: string;
  name: string;
  designs: Design[];
}
