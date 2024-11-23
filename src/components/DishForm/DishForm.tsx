import { useAppDispatch } from '@/app/hooks';
import { createDish, updateDish } from '@/store/thunks/dishesThunks';
import { DishBase } from '@/types';
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  id?: string;
  dish?: DishBase;
}

interface Data {
  title: string;
  price: number;
  imgURL: string;
}

const initialData: Data = {
  title: '',
  price: 0,
  imgURL: '',
};

const DishForm: FC<Props> = ({ id, dish = initialData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState<Data>(dish);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setData(dish);
  }, [dish]);

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!data.title || !data.price) {
      openModal();

      return;
    }

    if (id) {
      await dispatch(updateDish({ id, dish: data }));
    } else {
      await dispatch(createDish(data));
    }

    navigate('/admin/dishes');
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={1} width={400}>
        <TextField
          label='Title'
          name='title'
          variant='outlined'
          type='text'
          value={data.title}
          onChange={handleChange}
        />
        <TextField
          label='Price'
          name='price'
          variant='outlined'
          type='number'
          value={data.price}
          onChange={handleChange}
        />
        <TextField
          label='Image URL'
          name='imgURL'
          variant='outlined'
          type='url'
          value={data.imgURL}
          onChange={handleChange}
        />
        <Stack direction='row'>
          <Button type='submit'>Save</Button>
          <Button component={Link} to='/admin/dishes'>
            Back to dishes
          </Button>
        </Stack>
      </Stack>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography>Invalid dish.</Typography>
          <Box alignSelf='flex-end'>
            <Button color='error' onClick={closeModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </form>
  );
};

export default DishForm;
