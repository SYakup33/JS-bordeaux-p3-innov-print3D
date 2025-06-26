import { createBrowserRouter } from "react-router";
import Header from "./components/Header.tsx";
import Home from "./pages/Home.tsx";
import ProductList from "./pages/ProductList/ProductList.tsx";
import CartList from "./pages/cart/CartList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/cart/user/:id",
        element: <CartList />,
      },
    ],
  },
]);

export default router;
