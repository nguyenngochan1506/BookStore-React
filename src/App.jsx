import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  AdminBook,
  AdminHome,
  AdminUser,
  BookDetail,
  Cart,
  Checkout,
  ConfirmCheckout,
  Error,
  HistoryOrder,
  Home,
  Login,
  MyContainer,
  Profile,
  Register,
} from "./pages";

import { loader as homeLoader } from "./pages/Home";
import { loader as bookDetailLoader } from "./pages/BookDetail";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as historyOrderLoader } from "./pages/HistoryOrder";


import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";

import {store} from './store'
import PrivateRoute from "./route/PrivateRoute";
import AdminRote from "./route/AdminRote";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MyContainer />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: homeLoader
        },{
          element: <HistoryOrder/>,
          path:"/order-history",
          loader: historyOrderLoader
        },
        {
          path:'/profile',
          element:<Profile/>,
        },
        {
          path:'/cart',
          element:<Cart/>
        },
        {
          path: "",
          element: <PrivateRoute />,
          children: [
            {
              path: "/checkout",
              element: <Checkout />,
              loader: checkoutLoader
            },
            {
              element: <ConfirmCheckout/>,
              path:'/checkout/confirm'
            },
          ]
        },
        {
          path: "/login",
          element: <Login />,
          action: ({request})=>loginAction(store, request)
        },
        {
          path: "/book/:id",
          element: <BookDetail />,
          loader: bookDetailLoader
        },
        {
          path: '',
          element: <AdminRote/>,
          children: [
            {
              path: "/admin",
              element: <AdminHome />,
            },
            {
              path: "/admin/users",
              element: <AdminUser />,
            },
            {
              path: "/admin/books",
              element: <AdminBook />,
            },
          ]
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: '*',
          element:<Error/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
