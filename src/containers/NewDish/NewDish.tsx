import DishForm from '@/components/DishForm/DishForm';
import { Container } from '@mui/material';

const NewDish = () => {
  return (
    <Container sx={{ p: 2 }}>
      <DishForm />
    </Container>
  );
};

export default NewDish;
