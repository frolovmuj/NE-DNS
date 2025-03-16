import { FC } from 'react';
import { Header } from '../components';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer/Footer';

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
