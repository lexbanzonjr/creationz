export interface Category {
  _id: string;
  name: string;
  description: string;
  designs: Design[];
}

export interface Design {
  name: string;
  type: string;
}

export interface Option {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  cost: number;
  name: string;
  description: string;
  image_id: string[];
  category_id: string;
}

export interface Type {
  _id: string;
  name: string;
  options: Option[];
}
