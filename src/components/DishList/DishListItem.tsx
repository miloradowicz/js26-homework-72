import { FC, memo } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

interface Props {
  title: string;
  price: number;
  imgURL: string;
  defaultAction?: () => void;
  extraActions?: {
    name: string;
    action: () => void;
    state?: () => boolean;
  }[];
}

const DishListItem: FC<Props> = ({
  title,
  price,
  imgURL,
  defaultAction,
  extraActions,
}) => {
  return (
    <Card sx={{ display: 'flex' }} onClick={defaultAction ?? (() => {})}>
      <CardMedia
        component='img'
        sx={{ width: 100, height: 100 }}
        image={imgURL}
      />
      <CardContent sx={{ display: 'flex', flex: 1 }}>
        <Grid container sx={{ flex: 1 }}>
          <Grid size={8}>
            <Typography>{title}</Typography>
          </Grid>
          <Grid size={4}>
            <Typography>{price} KGS</Typography>
          </Grid>
        </Grid>
        {extraActions && (
          <Stack>
            {extraActions.map((x, i) =>
              x.state ? (
                <LoadingButton key={i} loading={x.state()} onClick={x.action}>
                  {x.name}
                </LoadingButton>
              ) : (
                <Button key={i} onClick={x.action}>
                  {x.name}
                </Button>
              )
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(DishListItem);
