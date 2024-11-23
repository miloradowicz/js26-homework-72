export interface Dish {
  id: string;
  title: string;
  price: number;
  imgURL: string;
}

export interface OrderItem {
  id: string;
  qty: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
}

export type CartItem = OrderItem;

export type DishBase = Omit<Dish, 'id'>;

export type OrderBase = Omit<Order, 'id'>;
