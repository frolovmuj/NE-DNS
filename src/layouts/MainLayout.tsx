import { FC } from 'react';
import { Header } from '../components';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
