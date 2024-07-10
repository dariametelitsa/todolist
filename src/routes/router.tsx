import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../app/App'
import { Login } from '../features/login/Login'
import { TodolistList } from '../features/todolistList/TodolistList'
import { PATH } from './PATH'
import { ErrorPage } from '../features/errorPage/ErrorPage'

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
        element: <TodolistList />,
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
])
