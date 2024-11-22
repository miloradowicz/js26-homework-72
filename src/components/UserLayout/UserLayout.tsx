import { Outlet } from 'react-router-dom';

import UserHeader from '@/components/UserHeader/UserHeader';
import UserFooter from '@/components/UserFooter/UserFooter';

const UserLayout = () => {
  return (
    <>
      <UserHeader />
      <Outlet />
      <UserFooter />
    </>
  );
};

export default UserLayout;
