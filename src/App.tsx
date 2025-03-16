import { Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import { Home, NotFound, Cart, CardPage } from './pages';

import './scss/app.scss';
import { Toaster } from 'react-hot-toast';
import Favorites from './pages/Favorites/Favorites';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="phones/:id" element={<CardPage />} />
          <Route
            path="favorites/"
            element={<Favorites />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
