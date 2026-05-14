import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SchedulePage from '../pages/SchedulePage';
import RosterPage from '../pages/RosterPage';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../layouts/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/SchedulePage',
        element: <SchedulePage />,
      },
      {
        path: '/RosterPage',
        element: <RosterPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
