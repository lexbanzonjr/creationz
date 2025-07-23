export interface Binary {
  _id: string;
  name: string;
  data?: File;
  "content-type": string;
}

export interface Image extends Binary {}

export interface CartItem {
  product: Product;
  quantity: number;
  note?: string;
}

export interface Cart {
  items: CartItem[];
}

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

export interface Order {
  _id: string;
  customer?: User;
  cart?: Cart;
  status: string; // e.g., "pending", "completed", "cancelled"
  orderNumber?: string;
  orderDate?: Date;
}

export interface Product {
  _id: string;
  cost: number;
  name: string;
  description: string;
  image_id: string[];
  categories: Category[];
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  roles: string[];
}

export interface Type {
  _id: string;
  name: string;
  options: Option[];
}
