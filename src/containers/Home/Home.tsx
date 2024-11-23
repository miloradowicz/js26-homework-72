import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CheckoutList from '@/components/CheckoutList/CheckoutList';
import DishList from '@/components/DishList/DishList';
import UserFooter from '@/components/UserFooter/UserFooter';
import { addItem, selectCart } from '@/store/slices/cartSlice';
import { selectDishes } from '@/store/slices/dishesSlice';
import { syncAllDishes } from '@/store/thunks/dishesThunks';
import { createOrder } from '@/store/thunks/ordersThunks';
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

const Home = () => {
  const dispatch = useAppDispatch();

  const dishes = useAppSelector(selectDishes);
  const cart = useAppSelector(selectCart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(syncAllDishes());
  }, [dispatch]);

  const defaultAction = useCallback(
    (id: string) => {
      dispatch(addItem(id));
    },
    [dispatch]
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const placeOrder = () => {
    dispatch(createOrder({ items: cart }));
    closeModal();
  };

  return (
    <>
      <Container sx={{ p: 2 }}>
        <DishList dishes={dishes} defaultAction={defaultAction} />
        <Modal open={isModalOpen} onClose={closeModal}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: 100,
              bottom: 100,
              left: '50%',
              transform: 'translate(-50%)',
              width: 600,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box>
              <Typography
                variant='h6'
                color='primary'
                sx={{ textDecoration: 'none' }}
              >
                Your Order:
              </Typography>
              <CheckoutList dishes={dishes} cart={cart} />
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
                }, 150)}
              </Typography>
            </Box>
            <Box alignSelf='flex-end'>
              <Button color='error' onClick={closeModal}>
                Close
              </Button>
              <Button color='primary' onClick={placeOrder}>
                Order
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
      <UserFooter dishes={dishes} cart={cart} onCheckout={openModal} />
    </>
  );
};

export default Home;
