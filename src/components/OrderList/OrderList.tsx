import { Order } from '@/types';
import { Stack } from '@mui/material';
import { FC } from 'react';
import OrderListItem from './OrderListItem';

interface Props {
  orders: Order[];
  completeAction: (id: string) => void;
}

const OrderList: FC<Props> = ({ orders, completeAction }) => {
  return (
    <Stack>
      {orders.map((x) => (
        <OrderListItem
          key={x.id}
          order={x}
          completeAction={() => completeAction(x.id)}
        />
      ))}
    </Stack>
  );
};

export default OrderList;
