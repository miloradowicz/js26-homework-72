import { AppBar, Link, Stack, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';

interface Props {
  title: string;
  links?: {
    title: string;
    url: string;
  }[];
}

const AdminHeader: FC<Props> = ({ title, links }) => {
  return (
    <AppBar>
      <Toolbar component='nav' sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant='h6'
          component={RouterLink}
          color='white'
          sx={{ textDecoration: 'none' }}
          to='/'
        >
          {title}
        </Typography>
        <Stack direction='row'>
          {links?.map((x, i) => (
            <Link
              key={i}
              underline='hover'
              color='inherit'
              component={RouterNavLink}
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
