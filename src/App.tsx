import { Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import { Home, NotFound, Cart, CardPage } from './pages';

import './scss/app.scss';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizzas/:id" element={<CardPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

