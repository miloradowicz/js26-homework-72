import Header from '../UI/Header/Header';

const links = [
  {
    title: 'Dishes',
    url: 'dishes',
  },
  {
    title: 'Orders',
    url: 'orders',
  },
];

const AdminHeader = () => {
  return <Header title='Turtle Pizza Admin' links={links} />;
};

export default AdminHeader;
