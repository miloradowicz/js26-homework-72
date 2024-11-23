import { useAppDispatch, useAppSelector } from '@/app/hooks';
import DishList from '@/components/DishList/DishList';
import { selectDeleteLoading, selectDishes } from '@/store/slices/dishesSlice';
import { deleteDish, syncAllDishes } from '@/store/thunks/dishesThunks';
import { Container } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dishes = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dishes = useAppSelector(selectDishes);
  const deleteLoading = useAppSelector(selectDeleteLoading);

  useEffect(() => {
    dispatch(syncAllDishes());
  }, [dispatch]);

  const editAction = useCallback(
    (id: string) => {
      navigate(`/admin/dishes/edit/${id}`);
    },
    [navigate]
  );

  const deleteAction = useCallback(
    async (id: string) => {
      await dispatch(deleteDish(id));
    },
    [dispatch]
  );

  const deleteActionState = useCallback(
    (id: string) => deleteLoading.findIndex((x) => x === id) > 0,
    [deleteLoading]
  );

  const extraActions = [
    {
      name: 'Edit',
      action: editAction,
    },
    {
      name: 'Delete',
      action: deleteAction,
      state: deleteActionState,
    },
  ];

  return (
    <Container sx={{ p: 2 }}>
      <DishList dishes={dishes} extraActions={extraActions} />
    </Container>
  );
};

export default Dishes;
