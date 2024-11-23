import { AppBar, Link, Stack, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import { NavLink as NavLink } from 'react-router-dom';

interface Props {
  title: string;
  links?: {
    title: string;
    url: string;
  }[];
}

const AdminHeader: FC<Props> = ({ title, links }) => {
  return (
    <AppBar position='static'>
      <Toolbar component='nav' sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h6' color='white' sx={{ textDecoration: 'none' }}>
          {title}
        </Typography>
        <Stack direction='row' gap={3}>
          {links?.map((x, i) => (
            <Link
              key={i}
              underline='hover'
              color='inherit'
              component={NavLink}
              to={x.url}
            >
              {x.title}
            </Link>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
