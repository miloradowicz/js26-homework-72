import { Box, Button, Grid2 as Grid, Typography } from '@mui/material';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  title: string;
  price: number;
  qty?: number;
  onDelete?: () => void;
}

const CheckoutListItem: FC<Props> = ({ title, price, qty, onDelete }) => {
  return (
    <Box>
      <Grid container>
        <Grid size={8} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography marginRight={2} component='span'>
            {title}
          </Typography>
          {qty && <Typography component='span'>x{qty}</Typography>}
        </Grid>
        <Grid size={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography textAlign='end'>{price * (qty ?? 1)} KGS</Typography>
        </Grid>
        <Grid size={2} sx={{ display: 'flex', alignItems: 'center' }}>
          {onDelete && (
            <Button color='error' onClick={onDelete}>
              <DeleteIcon />
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutListItem;
