import { Dish } from '@/types';
import { Stack } from '@mui/material';
import { FC } from 'react';
import DishListItem from './DishListItem';

interface Props {
  dishes: Dish[];
  defaultAction?: (id: string) => void;
  extraActions?: {
    name: string;
    action: (id: string) => void;
    state?: (id: string) => boolean;
  }[];
}

const DishList: FC<Props> = ({ dishes, defaultAction, extraActions }) => {
  return (
    <Stack>
      {dishes.map((x) => (
        <DishListItem
          key={x.id}
          title={x.title}
          price={x.price}
          imgURL={x.imgURL}
          defaultAction={defaultAction && (() => defaultAction(x.id))}
          extraActions={extraActions?.map((y) => ({
            ...y,
            action: () => {
              y.action(x.id);
            },
            state: y.state && (() => (y.state ? y.state(x.id) : false)),
          }))}
        />
      ))}
    </Stack>
  );
};

export default DishList;
