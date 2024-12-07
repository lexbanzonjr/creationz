export interface Category {
  _id: string;
  name: string;
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
  name: string;
  description: string;
  category_id: string;
}

export interface Type {
  _id: string;
  name: string;
  options: Option[];
}
