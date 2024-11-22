import { Route, Routes } from 'react-router-dom';

import AdminLayout from '@/components/AdminLayout/AdminLayout';
import UserLayout from '@/components/UserLayout/UserLayout';

import Home from '@/containers/Home/Home';
import Dishes from '@/containers/Dishes/Dishes';
import EditDish from '@/containers/EditDish/EditDish';
import NewDish from '@/containers/NewDish/NewDish';
import Orders from '@/containers/Orders/Orders';

function App() {
  return (
    <Routes>
      <Route path='/' element={<UserLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='admin' element={<AdminLayout />}>
        <Route index element={<Dishes />} />
        <Route path='dishes' element={<Dishes />}>
          <Route path='new' element={<NewDish />} />
          <Route path='edit/:id' element={<EditDish />} />
        </Route>
        <Route path='orders' element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default App;
