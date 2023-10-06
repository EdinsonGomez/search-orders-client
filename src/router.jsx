import { createBrowserRouter } from 'react-router-dom';
import Home from 'src/Pages/Home';
import OrderPage from 'src/Pages/OrderPage';

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