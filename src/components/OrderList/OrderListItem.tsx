import { useAppSelector } from '@/app/hooks';
import { selectDishes } from '@/store/slices/dishesSlice';
import { Order } from '@/types';
import {
  Grid2 as Grid,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import { FC } from 'react';

interface Props {
  order: Order;
  completeAction: () => void;
}

const OrderListItem: FC<Props> = ({ order, completeAction }) => {
  const dishes = useAppSelector(selectDishes);

  return (
    <Card>
      <CardContent>
        {order.items.map((x) => {
          const i = dishes.find((y) => y.id === x.id);

          if (i) {
            return (
              <Grid key={x.id} container>
                <Grid size={8} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography marginRight={2} component='span'>
                    {i.title}
                  </Typography>
                  {x.qty && <Typography component='span'>x{x.qty}</Typography>}
                </Grid>
                <Grid size={4} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography textAlign='end'>{i.price * x.qty} KGS</Typography>
                </Grid>
              </Grid>
            );
          }
        })}
      </CardContent>
      <CardActions>
        <Button onClick={completeAction}>Complete order</Button>
      </CardActions>
    </Card>
  );
};

export default OrderListItem;
