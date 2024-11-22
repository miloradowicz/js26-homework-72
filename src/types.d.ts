export interface Dish {
  id: string;
  title: string;
  price: number;
  imgURL: string;
}

export type DishBase = Omit<Dish, 'id'>;
