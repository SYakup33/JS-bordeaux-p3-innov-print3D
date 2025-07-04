import { createBrowserRouter } from "react-router";
import Header from "./components/Header.tsx";
import ConfirmedOrder from "./pages/ConfirmedOrder.tsx";
import Home from "./pages/Home.tsx";
import ProductList from "./pages/ProductList/ProductList.tsx";
import CartList from "./pages/cart/CartList.tsx";
import Product from "./pages/product/Product.tsx";

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
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/cart/user/:id",
        element: <CartList />,
      },
      {
        path: "/order/:id/confirmation",
        element: <ConfirmedOrder />,
      },
    ],
  },
]);

export default router;
