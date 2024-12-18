import { Dish, CartItem } from '@/types';
import { Box } from '@mui/material';
import { FC } from 'react';
import CheckoutListItem from './CheckoutListItem';
import { useAppDispatch } from '@/app/hooks';
import { removeItem } from '@/store/slices/cartSlice';

interface Props {
  dishes: Dish[];
  cart: CartItem[];
}

const CheckoutList: FC<Props> = ({ dishes, cart }) => {
  const dispatch = useAppDispatch();

  return (
    <Box>
      {cart.map((x) => {
        const i = dishes.find((y) => y.id === x.id);

        if (i) {
          return (
            <CheckoutListItem
              key={x.id}
              title={i.title}
              price={i.price}
              qty={x.id !== '---' ? x.qty : undefined}
              onDelete={
                x.id !== '---' ? () => dispatch(removeItem(x.id)) : undefined
              }
            />
          );
        }
      })}
    </Box>
  );
};

export default CheckoutList;
