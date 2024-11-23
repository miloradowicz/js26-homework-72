import { useAppDispatch, useAppSelector } from '@/app/hooks';
import OrderList from '@/components/OrderList/OrderList';
import { selectOrders } from '@/store/slices/ordersSlice';
import { syncAllDishes } from '@/store/thunks/dishesThunks';
import { deleteOrder, syncAllOrders } from '@/store/thunks/ordersThunks';
import { Container } from '@mui/material';
import { useEffect, useCallback } from 'react';

const Orders = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(syncAllDishes());
    dispatch(syncAllOrders());
  }, [dispatch]);

  const completeAction = useCallback(
    async (id: string) => {
      await dispatch(deleteOrder(id));
    },
    [dispatch]
  );

  return (
    <Container sx={{ p: 2 }}>
      <OrderList orders={orders} completeAction={completeAction} />
    </Container>
  );
};

export default Orders;
