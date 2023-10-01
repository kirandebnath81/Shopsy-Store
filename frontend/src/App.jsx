import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import homeLoader from "./loaders/homeLoader";
import Layout from "./layout/Layout";
import { ErrorBoundary } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "products",
        async loader() {
          const { loader } = await import("./loaders/productsLoader");
          return loader();
        },
        lazy: () => import("./pages/Products"),
      },
      {
        path: "products/:category/:title/:id",
        async loader({ params }) {
          const { loader } = await import("./loaders/singleProductLoader");
          return loader({ params });
        },
        lazy: () => import("./pages/SingleProduct"),
      },
      {
        lazy: () => import("./components/AuthRequired"),
        children: [
          {
            path: "cart",
            lazy: () => import("./pages/Cart"),
          },
          {
            path: "wishlist",
            lazy: () => import("./pages/Wishlist"),
          },
          {
            path: "checkout",
            lazy: () => import("./pages/Checkout"),
          },
          {
            path: "profile",
            lazy: () => import("./layout/ProfileLayout"),
            children: [
              {
                index: true,
                lazy: () => import("./pages/Profile/Settings"),
              },
              {
                path: "addresses",
                lazy: () => import("./pages/Profile/Addresses"),
              },
              {
                path: "orders",
                lazy: () => import("./pages/Profile/Orders"),
              },
            ],
          },
        ],
      },
      {
        path: "search",
        async loader() {
          const { loader } = await import("./loaders/searchLoader");
          return loader();
        },
        lazy: () => import("./pages/SearchedItems"),
      },
      {
        lazy: () => import("./components/AllowedWhenNotAuth"),
        children: [
          {
            path: "signin",
            lazy: () => import("./pages/Auth/SignIn"),
          },
          {
            path: "signup",
            lazy: () => import("./pages/Auth/SignUp"),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/404"} replace={true} />,
  },
  {
    path: "/404",
    lazy: () => import("./pages/ErrorPage"),
  },
]);

const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <div className="w-full flex justify-center mt-28 font-semibold text-4xl">
          Loading...
        </div>
      }
    />
  );
};

export default App;
