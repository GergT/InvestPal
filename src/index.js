import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './home';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Portfolio from './portfolio';

const router = createBrowserRouter([

  {path: "/",element: <Home />,},
  {path: "/portfolio",element: <Portfolio />,},
  /*{path: "/markets",element: <Markets />,},*/

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

