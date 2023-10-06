import { createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import OrderPage from './Pages/OrderPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/orders/:id',
    element: <OrderPage />
  }
]);

export default router;