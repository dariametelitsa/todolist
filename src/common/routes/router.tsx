import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../../app/App';
import { Login } from '../../features/auth/ui/Login';
import { TodolistlistsContainer } from '../../features/todolistList/TodolistlistsContainer';
import { PATH } from './PATH';
import { ErrorPage } from '../../features/errorPage/ErrorPage';

export const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <App />,
    errorElement: <Navigate to={PATH.ERROR} />,
    children: [
      {
        index: true,
        element: <Navigate to={PATH.TODOLISTS} />,
      },
      {
        path: PATH.LOGIN,
        element: <Login />,
      },
      {
        path: PATH.TODOLISTS,
        element: <TodolistlistsContainer />,
      },
      {
        path: PATH.ERROR,
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: '/errorPage',
    element: <ErrorPage />,
  },
]);
