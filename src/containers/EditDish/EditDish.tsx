import { useAppDispatch, useAppSelector } from '@/app/hooks';
import DishForm from '@/components/DishForm/DishForm';
import Loader from '@/components/UI/Header/Loader/Loader';
import { selectDishes, selectIsLoading } from '@/store/slices/dishesSlice';
import { syncDish } from '@/store/thunks/dishesThunks';
import { DishBase } from '@/types';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditDish = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const dishes = useAppSelector(selectDishes);
  const loading = useAppSelector(selectIsLoading);

  const [dish, setDish] = useState<DishBase>();

  useEffect(() => {
    (async () => {
      if (id) {
        await dispatch(syncDish(id));
      }
    })();
  }, [id, dispatch]);

  useEffect(() => {
    const i = dishes.findIndex((x) => x.id === id);

    if (i >= 0) {
      const { id: _, ..._data } = dishes[i];

      setDish(_data);
    }
  }, [id, dishes]);

  return (
    <Container sx={{ p: 2 }}>
      <DishForm id={id} dish={dish} />
      <Loader open={loading} />
    </Container>
  );
};

export default EditDish;
