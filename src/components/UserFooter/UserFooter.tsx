import { Dish, CartItem } from '@/types';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  dishes: Dish[];
  cart: CartItem[];
  onCheckout: () => void;
}

const UserFooter: FC<Props> = ({ dishes, cart, onCheckout }) => {
  return (
    <AppBar
      component='footer'
      position='fixed'
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: 'white',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant='h6'
          color='primary'
          sx={{ textDecoration: 'none' }}
        >
          Order total:
          {cart.reduce((a, x) => {
            const i = dishes.find((y) => y.id === x.id);

            if (i) {
              return a + i.price * x.qty;
            } else {
              return a;
            }
          }, 0)}
        </Typography>
        <Button onClick={onCheckout} disabled={cart.length ? false : true}>
          Checkout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserFooter;
